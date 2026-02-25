// PoC: Maglev ContextMayAlias Disabled - Context Slot Store-Store Elimination
// Target: maglev-graph-builder.cc line 3222 (crbug.com/401059828)
//
// ContextMayAlias is unconditionally disabled: if ((true) || ...)
// This was a workaround for crashes but may allow incorrect
// store-store elimination of context slot stores.

function contextAliasBug() {
  // Create closures with shared-looking context structures
  function makeClosures() {
    let captured = 0;
    
    function writer() {
      captured = 42;     // Context slot store #1
      // If store-store elimination incorrectly kills this...
      captured = 100;    // Context slot store #2 
      
      // ...because it thinks no alias exists between stores
    }
    
    function reader() {
      return captured;   // Should always see 100 (or 42 if #2 was killed)
    }
    
    return { writer, reader };
  }
  
  let closures = makeClosures();
  closures.writer();
  return closures.reader(); // Should be 100
}

// Warmup
for (let i = 0; i < 50000; i++) {
  let result = contextAliasBug();
  if (result !== 100) {
    console.log("BUG: Expected 100 but got " + result + " at iteration " + i);
    break;
  }
}

// More complex scenario with actual aliasing
function contextAliasBug2() {
  let fns = [];
  
  for (let i = 0; i < 10; i++) {
    let val = i;
    // Each iteration creates a new context with 'val'
    // ContextMayAlias returning true (correct behavior after fix)
    // means caching should be conservative
    
    fns.push({
      set: (v) => { val = v; },
      get: () => val
    });
  }
  
  // Interleave sets and gets
  for (let i = 0; i < fns.length; i++) {
    fns[i].set(i * 10);
  }
  
  let results = [];
  for (let i = 0; i < fns.length; i++) {
    results.push(fns[i].get());
  }
  
  // Verify each closure sees its own value
  for (let i = 0; i < results.length; i++) {
    if (results[i] !== i * 10) {
      console.log("BUG: Context aliasing issue at index " + i + 
                  ": expected " + (i * 10) + " got " + results[i]);
      return false;
    }
  }
  return true;
}

for (let i = 0; i < 50000; i++) {
  if (!contextAliasBug2()) break;
}

console.log("Context alias test completed");
