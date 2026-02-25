// PoC: Maglev DataView Constant Caching with Detaching Protector
// Target: maglev-graph-builder.cc TryBuildLoadDataView (line ~10008)
//
// DataView's byte_length and data_pointer are cached as "constant" properties
// when the ArrayBufferDetachingProtector is intact. There is a TOCTOU window
// between the protector check and actual memory access.

function dataViewCacheBug() {
  let buffer = new ArrayBuffer(1024);
  let dv = new DataView(buffer);
  
  // Write known values
  for (let i = 0; i < 256; i++) {
    dv.setInt32(i * 4, i, true);
  }
  
  // Read back with cached byte_length and data_pointer
  let sum = 0;
  for (let i = 0; i < 256; i++) {
    sum += dv.getInt32(i * 4, true);
  }
  
  return sum;
}

// Warmup to compile with cached constants
for (let i = 0; i < 50000; i++) {
  dataViewCacheBug();
}

// Verify correct result
let expected = 0;
for (let i = 0; i < 256; i++) expected += i;
let actual = dataViewCacheBug();
if (actual !== expected) {
  console.log("BUG: Expected " + expected + " but got " + actual);
} else {
  console.log("OK: DataView caching works correctly = " + actual);
}

// Now test: what happens if we create a new DataView on a different buffer
// after the protector is established?
function dataViewReusePattern() {
  let buf1 = new ArrayBuffer(64);
  let dv1 = new DataView(buf1);
  dv1.setFloat64(0, 1.1, true);
  dv1.setFloat64(8, 2.2, true);
  
  let val1 = dv1.getFloat64(0, true); // Cached as constant property
  let val2 = dv1.getFloat64(8, true); // Also cached
  
  return val1 + val2;
}

for (let i = 0; i < 50000; i++) {
  let r = dataViewReusePattern();
  if (Math.abs(r - 3.3) > 0.001) {
    console.log("BUG: DataView reuse pattern failed: " + r);
    break;
  }
}

console.log("DataView caching test completed");
