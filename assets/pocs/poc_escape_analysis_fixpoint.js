// PoC: Maglev Escape Analysis Single-Pass Fixpoint Issue
// Target: maglev-post-hoc-optimizations-processors.h RunEscapeAnalysis
//
// The escape analysis iterates allocations_escape_map() once.
// DropUseOfValueInStoresToCapturedAllocations() can change escape status
// AFTER the analysis, without re-running the fixpoint.
//
// Strategy: Create allocation dependency chain where order matters.

function triggerEscapeAnalysisBug() {
  // Phase 1: Create a chain of allocations with specific dependencies
  function createChain(x) {
    // Allocation B: inner object, only referenced through A
    let inner = { val: x, pad1: 1.1, pad2: 2.2 };
    
    // Allocation A: outer object, references inner
    let outer = { ref: inner, data: x + 1 };
    
    // The escape analysis processes allocations in map order.
    // If outer (A) is processed before inner (B):
    //   - A's uses are checked, A might be non-escaping
    //   - A is elided
    //   - DropUseOfValueInStoresToCapturedAllocations removes the use of B in A
    //   - But B was already processed and marked as escaped
    
    // Only use outer.ref.val - inner shouldn't independently escape
    return outer.ref.val + outer.data;
  }
  
  let result = 0;
  for (let i = 0; i < 100; i++) {
    result += createChain(i);
  }
  return result;
}

// Warmup to trigger Maglev compilation
for (let i = 0; i < 50000; i++) {
  triggerEscapeAnalysisBug();
}

// Verify correctness
let expected = 0;
for (let i = 0; i < 100; i++) {
  expected += i + (i + 1);
}
let actual = triggerEscapeAnalysisBug();
if (actual !== expected) {
  console.log("BUG: Expected " + expected + " but got " + actual);
} else {
  console.log("OK: " + actual);
}
