// Advanced WasmGC Type Confusion Fuzzer
// Targets: wasm-gc-typed-optimization-reducer.cc ProcessPhi reachability gap
// Strategy: Build increasingly complex WasmGC modules that stress the
// reachability tracker with exception handling, indirect calls, and
// multi-block Phi merges
//
// The key insight from the source code analysis:
//   ProcessPhi unions predecessor types. If predecessors are bottom,
//   Phi type = bottom. The DCHECK says "reachability tracking might
//   in some cases miss that a block becomes unreachable."
//
// We need to create scenarios where:
//   1. A block has predecessors that APPEAR unreachable to the analyzer
//   2. But ARE actually reachable at runtime
//   3. The Phi gets bottom type
//   4. Downstream ref.cast is eliminated
//   5. Type confusion occurs

function leb128_u(v){const r=[];do{let b=v&0x7f;v>>>=7;if(v)b|=0x80;r.push(b)}while(v);return r}
function leb128_s(v){const r=[];let m=true;while(m){let b=v&0x7f;v>>=7;if((v===0&&!(b&0x40))||(v===-1&&(b&0x40)))m=false;else b|=0x80;r.push(b)}return r}
function section(id,c){return[id,...leb128_u(c.length),...c]}
function vec(items){return[...leb128_u(items.length),...items.flat()]}
function str(s){const e=new TextEncoder().encode(s);return[...leb128_u(e.length),...e]}

const GC=0xfb;
const I32=0x7f, I64=0x7e, F64=0x7c, FUNCREF=0x70;
const ST=0x5f, FT=0x60, SUB=0x50, SUBF=0x4f, REC=0x4e;
const END=0x0b, BLOCK=0x02, LOOP=0x03, IF=0x04, ELSE=0x05;
const BR=0x0c, BR_IF=0x0d, BR_TABLE=0x0e;
const CALL=0x10, CALL_INDIRECT=0x11, RETURN=0x0f;
const LOCAL_GET=0x20, LOCAL_SET=0x21, LOCAL_TEE=0x22;
const GLOBAL_GET=0x23, GLOBAL_SET=0x24;
const I32_CONST=0x41, I64_CONST=0x42, F64_CONST=0x44;
const I32_EQZ=0x45, I32_EQ=0x46, I32_NE=0x47;
const I32_LT_S=0x48, I32_GT_S=0x4a, I32_LE_S=0x4c, I32_GE_S=0x4e;
const I32_ADD=0x6a, I32_SUB=0x6b, I32_MUL=0x6c;
const I32_AND=0x71, I32_OR=0x72, I32_XOR=0x73;
const I32_REM_U=0x70, I32_SHL=0x74, I32_SHR_U=0x76;
const DROP=0x1a, SELECT=0x1b, NOP=0x01, UNREACHABLE=0x00;

// GC opcodes (prefix 0xfb)
const STRUCT_NEW=0x00, STRUCT_NEW_DEFAULT=0x01;
const STRUCT_GET=0x02, STRUCT_SET=0x03;
const ARRAY_NEW=0x06, ARRAY_NEW_DEFAULT=0x07;
const ARRAY_GET=0x0b, ARRAY_SET=0x0c, ARRAY_LEN=0x0f;
const REF_CAST=0x17, REF_CAST_NULL=0x18;
const REF_TEST=0x14, REF_TEST_NULL=0x15;

// Non-prefixed ref ops
const REF_NULL=0xd0, REF_IS_NULL=0xd1, REF_FUNC=0xd2;
const REF_AS_NON_NULL=0xd4;

// Exception handling
const TRY=0x06, CATCH=0x07, THROW=0x08, RETHROW=0x09;
const CATCH_ALL=0x19;

// ============================================================
// Fuzzer Module 1: Exception handling path confusion
// 
// Creates a try/catch where the catch block merges a ref via Phi
// with the try block's ref. If the analyzer considers the catch
// block unreachable (no throw visible), the Phi type becomes bottom.
// ============================================================
function buildExceptionPhiModule() {
  // Rec group with 2 struct types + function types
  const types = [
    1, REC, 5,  // 1 rec group, 5 types
    
    // Type 0: struct A { mut i32, mut i32 }
    SUB, 0, ST, 2, I32, 1, I32, 1,
    
    // Type 1: struct B { mut f64 } (different layout!)
    SUBF, 0, ST, 1, F64, 1,
    
    // Type 2: tag type () -> void 
    SUBF, 0, FT, 0, 0,
    
    // Type 3: func (i32) -> i32
    SUBF, 0, FT, 1, I32, 1, I32,
    
    // Type 4: func () -> (ref null 0)
    SUBF, 0, FT, 0, 1, 0x63, 0,  // returns ref null $type0
  ];
  
  const typeSection = section(1, types);
  
  // Tag section (exception tag using type 2)
  const tagSection = section(0x0d, [1, 0x00, 2]);  // 1 tag, attribute 0, type 2
  
  // Function section: 3 functions (indices 0, 1, 2)
  const funcSection = section(3, [3, 3, 4, 3]);  // types: 3, 4, 3
  
  // Table for indirect calls
  const tableSection = section(4, [1, FUNCREF, 0x00, 2]);  // 1 table, funcref, min=2
  
  // Global: mutable i32 for runtime control
  const globalSection = section(6, [1, I32, 1, I32_CONST, 0, END]);  // 1 global mut i32 = 0
  
  // Element section: populate table with func 1
  const elemSection = section(9, [
    1,     // 1 element segment
    0x00,  // flags: active, table 0
    I32_CONST, 0, END,  // offset = 0
    2,     // 2 elements
    0, 1,  // func indices 0 and 1
  ]);
  
  // Export section
  const exportSection = section(7, vec([
    [...str("trigger"), 0x00, ...leb128_u(0)],   // export func 0
    [...str("set_mode"), 0x00, ...leb128_u(2)],   // export func 2
  ]));
  
  // Func 0: Main trigger function
  // Uses try/catch + indirect call to confuse reachability
  const func0Body = [
    // locals: ref null type0, i32
    2,
    1, 0x63, 0,  // local 1: ref null $type0
    1, I32,       // local 2: i32 result
    
    // Create struct A initially
    I32_CONST, ...leb128_s(0x41414141),
    I32_CONST, ...leb128_s(0x42424242),
    GC, STRUCT_NEW, ...leb128_u(0),
    LOCAL_SET, 1,
    
    // try block — the catch creates an alternative Phi path
    TRY, 0x40,  // try (void)
    
      // Call through table (indirect) — analyzer may not know which func
      // If global == 1, calls func that throws
      GLOBAL_GET, 0,
      CALL_INDIRECT, ...leb128_u(4), 0x00,  // call table[global], type 4
      LOCAL_SET, 1,  // overwrite ref with returned value
    
    CATCH, 0,  // catch tag 0
      // Catch block: create a DIFFERENT struct and cast
      // If the Phi merging try-path ref and catch-path ref
      // gets bottom type, the cast below may be eliminated
      I32_CONST, ...leb128_s(0xDEAD),
      I32_CONST, ...leb128_s(0xBEEF),
      GC, STRUCT_NEW, ...leb128_u(0),
      LOCAL_SET, 1,
    
    END,  // end try
    
    // === CRITICAL: This is where type confusion would manifest ===
    // The Phi here merges refs from: (1) try block normal path, (2) catch path
    // If the analyzer thinks catch is unreachable, Phi type = bottom
    // Then this struct.get might access wrong field
    LOCAL_GET, 1,
    REF_IS_NULL,
    IF, I32,  // if null
      I32_CONST, ...leb128_s(-1),
    ELSE,
      LOCAL_GET, 1,
      REF_AS_NON_NULL,
      GC, STRUCT_GET, ...leb128_u(0), ...leb128_u(0),  // struct.get type0 field0
    END,
    
    END,  // end func
  ];
  
  // Func 1: Returns a struct ref (called indirectly via table)
  // Sometimes throws to exercise catch path
  const func1Body = [
    0,  // no locals
    
    // If global != 0, throw (make catch reachable)
    GLOBAL_GET, 0,
    IF, 0x40,
      THROW, 0,  // throw tag 0
    END,
    
    // Otherwise return a struct
    I32_CONST, ...leb128_s(42),
    I32_CONST, ...leb128_s(99),
    GC, STRUCT_NEW, ...leb128_u(0),
    
    END,
  ];
  
  // Func 2: set_mode — controls whether func1 throws
  const func2Body = [
    0,  // no locals
    LOCAL_GET, 0,
    GLOBAL_SET, 0,
    I32_CONST, 0,  // return 0
    END,
  ];
  
  const codeSection = section(0x0a, vec([
    [...leb128_u(func0Body.length), ...func0Body],
    [...leb128_u(func1Body.length), ...func1Body],
    [...leb128_u(func2Body.length), ...func2Body],
  ]));
  
  return new Uint8Array([
    0x00, 0x61, 0x73, 0x6d,
    0x01, 0x00, 0x00, 0x00,
    ...typeSection,
    ...funcSection,
    ...tableSection,
    ...globalSection,
    ...exportSection,
    ...elemSection,
    ...tagSection,
    ...codeSection,
  ]);
}

// ============================================================
// Fuzzer Module 2: Multi-block Phi with br_table
//
// Uses br_table to create complex control flow where the analyzer
// may not track all incoming edges to a block correctly.
// The Phi at the join point merges refs from N blocks.
// ============================================================
function buildBrTablePhiModule() {
  const types = [
    2,  // 2 types
    ST, 2, I32, 1, I32, 1,    // type 0: struct { i32, i32 }
    FT, 1, I32, 1, I32,       // type 1: func(i32) -> i32
  ];
  
  const typeSection = section(1, types);
  const funcSection = section(3, [1, 1]);
  const exportSection = section(7, vec([
    [...str("br_phi"), 0x00, 0x00],
  ]));
  
  const funcBody = [
    // locals: ref null type0, i32 result
    2,
    1, 0x63, 0,  // ref null type0
    1, I32,
    
    // Block structure: 
    //   block $outer
    //     block $b0
    //       block $b1  
    //         block $b2
    //           br_table $b0 $b1 $b2 $outer  (based on param mod 4)
    //         end $b2: create struct(3,3)
    //         br $outer
    //       end $b1: create struct(2,2) 
    //       br $outer
    //     end $b0: create struct(1,1)
    //     br $outer
    //   end $outer — Phi merges 4 possible refs
    
    BLOCK, 0x40,  // $outer
      BLOCK, 0x40,  // $b0
        BLOCK, 0x40,  // $b1
          BLOCK, 0x40,  // $b2
            LOCAL_GET, 0,     // param
            I32_CONST, 4,
            I32_REM_U,        // param % 4
            BR_TABLE,         // br_table
              3,              // 3 targets + default
              0, 1, 2, 3,    // targets: $b2, $b1, $b0, $outer
          END,  // end $b2
          // Case 0: 
          I32_CONST, ...leb128_s(100),
          I32_CONST, ...leb128_s(200),
          GC, STRUCT_NEW, ...leb128_u(0),
          LOCAL_SET, 1,
          BR, 3,  // br $outer
        END,  // end $b1
        // Case 1:
        I32_CONST, ...leb128_s(300),
        I32_CONST, ...leb128_s(400),
        GC, STRUCT_NEW, ...leb128_u(0),
        LOCAL_SET, 1,
        BR, 2,  // br $outer
      END,  // end $b0
      // Case 2:
      I32_CONST, ...leb128_s(500),
      I32_CONST, ...leb128_s(600),
      GC, STRUCT_NEW, ...leb128_u(0),
      LOCAL_SET, 1,
      BR, 1,  // br $outer
    END,  // end $outer — Phi join point
    
    // Read field from merged ref
    LOCAL_GET, 1,
    REF_IS_NULL,
    IF, I32,
      I32_CONST, ...leb128_s(-1),  // null case (default branch)
    ELSE,
      LOCAL_GET, 1,
      REF_AS_NON_NULL,
      GC, STRUCT_GET, ...leb128_u(0), ...leb128_u(0),
    END,
    
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

// ============================================================
// Fuzzer Module 3: Recursive type + deep cast chain
//
// Creates a recursive type hierarchy and performs multiple
// upcasts/downcasts in a loop. The optimizer may incorrectly
// eliminate intermediate casts if type narrowing compounds.
// ============================================================
function buildDeepCastChainModule() {
  const types = [
    1, REC, 4,  // 1 rec group, 4 types
    
    // Type 0: struct Base { mut i32 } — OPEN for extension
    SUB, 0, ST, 1, I32, 1,
    
    // Type 1: struct Mid extends Base { mut i32, mut i32 }
    SUB, 1, 0, ST, 2, I32, 1, I32, 1,
    
    // Type 2: struct Leaf extends Mid { mut i32, mut i32, mut f64 }
    SUBF, 1, 1, ST, 3, I32, 1, I32, 1, F64, 1,
    
    // Type 3: func (i32, i32) -> i32
    SUBF, 0, FT, 2, I32, I32, 1, I32,
  ];
  
  const typeSection = section(1, types);
  const funcSection = section(3, [1, 3]);
  const exportSection = section(7, vec([
    [...str("deep_cast"), 0x00, 0x00],
  ]));
  
  const f64_pi = [...new Uint8Array(new Float64Array([3.14159]).buffer)];
  
  const funcBody = [
    // locals: ref null type0 (base ref), i32 counter, i32 sum
    3,
    1, 0x63, 0,  // ref null $base
    1, I32,       // counter
    1, I32,       // sum
    
    // Create Leaf struct  
    LOCAL_GET, 0,    // field 0 = param0
    LOCAL_GET, 1,    // field 1 = param1
    F64_CONST, ...f64_pi,
    GC, STRUCT_NEW, ...leb128_u(2),  // struct.new Leaf
    
    // Implicit upcast to Base (ref $Leaf -> ref $Base)
    LOCAL_SET, 2,  // store as base ref
    
    // Loop: repeatedly downcast from base -> mid -> leaf and back
    LOCAL_SET, 3, // counter = 0
    I32_CONST, 0,
    LOCAL_SET, 3,
    
    I32_CONST, 0,
    LOCAL_SET, 4,  // sum = 0
    
    BLOCK, 0x40,
      LOOP, 0x40,
        // Downcast: base -> Leaf
        LOCAL_GET, 2,
        GC, REF_CAST, ...leb128_s(2),  // ref.cast to Leaf (type 2)
        
        // Read field 0 from Leaf
        GC, STRUCT_GET, ...leb128_u(2), ...leb128_u(0),
        
        // Accumulate
        LOCAL_GET, 4,
        I32_ADD,
        LOCAL_SET, 4,
        
        // Also downcast to Mid and read field 1
        LOCAL_GET, 2,
        GC, REF_CAST, ...leb128_s(1),  // ref.cast to Mid (type 1)
        GC, STRUCT_GET, ...leb128_u(1), ...leb128_u(1),
        LOCAL_GET, 4,
        I32_ADD,
        LOCAL_SET, 4,
        
        // counter++
        LOCAL_GET, 3,
        I32_CONST, 1,
        I32_ADD,
        LOCAL_SET, 3,
        
        // Loop if counter < 100000
        LOCAL_GET, 3,
        I32_CONST, ...leb128_s(100000),
        I32_LT_S,
        BR_IF, 0,
      END,
    END,
    
    LOCAL_GET, 4,
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

// ============================================================
// Test Runner
// ============================================================
async function runAllTests() {
  const failures = [];
  
  console.log("=== WasmGC Advanced Fuzzer ===");
  console.log(`Node.js: ${process.version}`);
  console.log("");
  
  // Test 1: Exception Phi Module
  console.log("=== Test 1: Exception Handling Phi ===");
  try {
    const bytes = buildExceptionPhiModule();
    console.log(`Module size: ${bytes.length} bytes`);
    const mod = new WebAssembly.Module(bytes);
    const inst = await WebAssembly.instantiate(mod);
    
    // Mode 0: no throw, normal path
    inst.exports.set_mode(0);
    let r = inst.exports.trigger(0);
    console.log(`Mode 0 (no throw): trigger(0) = ${r} (expect 42)`);
    if (r !== 42) {
      console.log("ANOMALY: wrong value in no-throw path!");
      failures.push("exception_phi_mode0");
    }
    
    // Mode 1: throw, catch path
    inst.exports.set_mode(1);
    r = inst.exports.trigger(0);
    console.log(`Mode 1 (throw+catch): trigger(0) = ${r} (expect 0xDEAD = ${0xDEAD})`);
    if (r !== 0xDEAD) {
      console.log("ANOMALY: wrong value in catch path!");
      failures.push("exception_phi_mode1");
    }
    
    // Alternate rapidly between modes to stress Phi
    let anomalies = 0;
    for (let i = 0; i < 100000; i++) {
      const mode = i % 3;  // 0, 1, 2(=throw), cycling
      inst.exports.set_mode(mode > 0 ? 1 : 0);
      const expected = mode > 0 ? 0xDEAD : 42;
      const got = inst.exports.trigger(0);
      if (got !== expected) {
        anomalies++;
        if (anomalies <= 5) console.log(`  ANOMALY at i=${i}: mode=${mode}, got=${got}, expected=${expected}`);
      }
    }
    console.log(`100K alternating mode iterations: ${anomalies} anomalies`);
    if (anomalies > 0) failures.push("exception_phi_alternating");
  } catch(e) {
    console.log(`ERROR: ${e.message}`);
    console.log(`Stack: ${e.stack?.split('\n').slice(0,3).join('\n')}`);
    failures.push("exception_phi_compile");
  }
  
  // Test 2: br_table Phi Module
  console.log("\n=== Test 2: br_table Multi-Block Phi ===");
  try {
    const bytes = buildBrTablePhiModule();
    console.log(`Module size: ${bytes.length} bytes`);
    const mod = new WebAssembly.Module(bytes);
    const inst = await WebAssembly.instantiate(mod);
    
    const expected = { 0: 100, 1: 300, 2: 500, 3: -1 };
    for (const [input, exp] of Object.entries(expected)) {
      const r = inst.exports.br_phi(parseInt(input));
      console.log(`br_phi(${input}) = ${r} (expect ${exp})`);
      if (r !== exp) {
        console.log(`  ANOMALY: got ${r} instead of ${exp}`);
        failures.push(`br_table_${input}`);
      }
    }
    
    // Stress test with many values
    let anomalies = 0;
    for (let i = 0; i < 500000; i++) {
      const v = inst.exports.br_phi(i);
      let exp;
      switch (i % 4) {
        case 0: exp = 100; break;
        case 1: exp = 300; break;
        case 2: exp = 500; break;
        case 3: exp = -1; break;
      }
      if (v !== exp) {
        anomalies++;
        if (anomalies <= 5) console.log(`  ANOMALY at i=${i}: got=${v}, expected=${exp}`);
      }
    }
    console.log(`500K iterations: ${anomalies} anomalies`);
    if (anomalies > 0) failures.push("br_table_stress");
  } catch(e) {
    console.log(`ERROR: ${e.message}`);
    failures.push("br_table_compile");
  }
  
  // Test 3: Deep Cast Chain
  console.log("\n=== Test 3: Deep Cast Chain (Recursive Types) ===");
  try {
    const bytes = buildDeepCastChainModule();
    console.log(`Module size: ${bytes.length} bytes`);
    const mod = new WebAssembly.Module(bytes);
    const inst = await WebAssembly.instantiate(mod);
    
    // deep_cast(a, b) creates Leaf{a, b, 3.14} and does 100K downcast loops
    // Expected: 100000 * (a + b) 
    for (const [a, b] of [[1, 2], [42, 99], [0, 0], [-1, -1]]) {
      const r = inst.exports.deep_cast(a, b);
      const exp = (100000 * (a + b)) | 0;
      console.log(`deep_cast(${a}, ${b}) = ${r} (expect ${exp})`);
      if (r !== exp) {
        console.log(`  ANOMALY: got ${r} instead of ${exp}`);
        failures.push(`deep_cast_${a}_${b}`);
      }
    }
    
    // Rapid calls with different values
    let anomalies = 0;
    for (let i = 0; i < 1000; i++) {
      const a = (i * 7) & 0xff;
      const b = (i * 13) & 0xff;
      const r = inst.exports.deep_cast(a, b);
      const exp = (100000 * (a + b)) | 0;
      if (r !== exp) {
        anomalies++;
        if (anomalies <= 5) console.log(`  ANOMALY at i=${i}: a=${a}, b=${b}, got=${r}, exp=${exp}`);
      }
    }
    console.log(`1K rapid calls (100K casts each = 100M total casts): ${anomalies} anomalies`);
    if (anomalies > 0) failures.push("deep_cast_stress");
  } catch(e) {
    console.log(`ERROR: ${e.message}`);
    console.log(`Stack: ${e.stack?.split('\n').slice(0,3).join('\n')}`);
    failures.push("deep_cast_compile");
  }
  
  // Summary
  console.log("\n=== SUMMARY ===");
  if (failures.length === 0) {
    console.log("ALL TESTS SAFE — No type confusion detected");
    console.log("The WasmGC type system and cast operations are correctly preserved");
    console.log("through exception handling, br_table, and multi-level cast chains.");
  } else {
    console.log(`FAILURES: ${failures.join(', ')}`);
    console.log("TYPE CONFUSION OR MISCOMPILATION DETECTED!");
  }
}

runAllTests().catch(e => console.error('Fatal:', e));
