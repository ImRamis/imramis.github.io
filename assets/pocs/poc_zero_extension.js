// PoC: Maglev Int32/Uint32 Zero Extension Missing in Release
// Target: maglev-code-generator.cc lines 851-866
//
// The zero-extension verification for int32/uint32 values is only enabled
// behind v8_flags.slow_debug_code. In release builds, upper 32 bits
// of a 64-bit register may contain garbage after int32 operations.
// This could affect unsigned comparisons used for bounds checks.

function zeroExtensionBug(a, b) {
  // Perform int32 arithmetic that might leave upper bits dirty
  let idx = (a | 0) - (b | 0);  // Int32 subtraction
  
  // Convert to uint32 for element access
  let uidx = idx >>> 0;
  
  // Use as array index - bounds check uses unsigned comparison
  let arr = new Uint8Array(256);
  if (uidx < arr.length) {
    return arr[uidx];
  }
  return -1;
}

// Warmup
for (let i = 0; i < 100000; i++) {
  zeroExtensionBug(100, 50);
}

// Test with edge cases
console.log("Normal case: " + zeroExtensionBug(100, 50));  // idx = 50
console.log("Zero case: " + zeroExtensionBug(50, 50));     // idx = 0
console.log("Negative case: " + zeroExtensionBug(50, 100)); // idx = -50, uidx = large

// More aggressive: operations near int32 boundary
function boundaryExtensionBug(x) {
  let val = (x | 0);
  
  // Bit manipulation that could leave upper bits dirty on x64
  let shifted = val << 1;
  let masked = shifted & 0x7FFFFFFF;
  
  // Use as index with unsigned comparison
  let arr = new Float64Array(1024);
  let idx = masked >>> 0;
  if (idx < arr.length) {
    return arr[idx];
  }
  return 0.0;
}

for (let i = 0; i < 100000; i++) {
  boundaryExtensionBug(i);
}

// Test at int32 boundaries
console.log("Boundary 0: " + boundaryExtensionBug(0));
console.log("Boundary max: " + boundaryExtensionBug(0x3FFFFFFF));
console.log("Boundary neg: " + boundaryExtensionBug(-1));

console.log("Zero extension test completed");
