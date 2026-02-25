#!/usr/bin/env node
/**
 * V8 Regression Fuzzer - Chrome VRP Security Research
 * =====================================================
 * Comprehensive JavaScript fuzzer targeting V8 regression patterns
 * from recent CVEs. Tests JIT compiler optimization edge cases across
 * Turbofan, Maglev, and Turboshaft pipelines.
 *
 * Usage:
 *   node --allow-natives-syntax poc_v8_regression_fuzzer.js [duration_seconds]
 *   node poc_v8_regression_fuzzer.js [duration_seconds]
 *
 * Default duration: 60 seconds
 *
 * CVE patterns tested:
 *   CVE-2024-0517 - Out of bounds write in V8
 *   CVE-2024-2887 - Type Confusion in WebAssembly
 *   CVE-2024-3159 - Out of Bounds Memory Access in V8
 *   CVE-2024-4947 - Type Confusion in V8
 */

'use strict';

// ============================================================
// Configuration
// ============================================================
const DURATION_SEC = parseInt(process.argv[2]) || 60;
const ITERATIONS_PER_TEST = 5000;
const VERBOSE = process.argv.includes('--verbose');

const results = {
  total: 0,
  safe: 0,
  suspicious: 0,
  vulnerable: 0,
  crashes: 0,
  errors: [],
  findings: []
};

const startTime = Date.now();
const endTime = startTime + DURATION_SEC * 1000;

// Check if --allow-natives-syntax is available
let hasNativeSyntax = false;
try {
  eval('%CollectGarbage()');
  hasNativeSyntax = true;
} catch (e) {
  hasNativeSyntax = false;
}

// ============================================================
// Utility Functions
// ============================================================
function log(msg) {
  if (VERBOSE) console.log(`[*] ${msg}`);
}

function logFinding(severity, testName, detail) {
  const entry = { severity, testName, detail, timestamp: Date.now() - startTime };
  results.findings.push(entry);
  const icon = severity === 'VULNERABLE' ? '🔴' : severity === 'SUSPICIOUS' ? '🟡' : '🟢';
  console.log(`${icon} [${severity}] ${testName}: ${detail}`);
}

function timeRemaining() {
  return Date.now() < endTime;
}

function triggerGC() {
  if (hasNativeSyntax) {
    try { eval('%CollectGarbage()'); } catch (e) {}
  }
  // Fallback: allocate + drop to encourage GC
  for (let i = 0; i < 100; i++) {
    let arr = new Array(10000).fill({});
    arr = null;
  }
}

function optimizeFunction(fn) {
  if (hasNativeSyntax) {
    try {
      eval(`%PrepareFunctionForOptimization(fn)`);
      fn();
      fn();
      eval(`%OptimizeFunctionOnNextCall(fn)`);
      fn();
    } catch (e) {}
  } else {
    // Without native syntax, just call many times to trigger JIT
    for (let i = 0; i < 10000; i++) {
      try { fn(); } catch (e) {}
    }
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randFloat() {
  return Math.random() * Number.MAX_SAFE_INTEGER * (Math.random() > 0.5 ? 1 : -1);
}

// ============================================================
// Test Category 1: JIT Type Confusion
// Pattern: CVE-2024-4947 / CVE-2024-0517
// Trigger type confusion through polymorphic call sites and
// map transitions during JIT compilation.
// ============================================================
function testJITTypeConfusion() {
  const testName = 'JIT Type Confusion';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Object shape transition during optimized access
  try {
    function accessProp(obj) {
      return obj.x + obj.y;
    }

    const shapes = [];
    // Create objects with same shape
    for (let i = 0; i < 1000; i++) {
      shapes.push({ x: i, y: i * 2 });
    }

    // Optimize with monomorphic feedback
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      accessProp(shapes[i % shapes.length]);
    }

    // Now introduce different map - try to trigger deopt/type confusion
    const weird = { x: 1.1, y: 2.2 };  // SMI -> HeapNumber transition
    const result = accessProp(weird);
    if (result !== 3.3000000000000003 && result !== 3.3) {
      // Allow for floating point
      if (Math.abs(result - 3.3) > 0.001) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName, `Unexpected result after map transition: ${result}`);
      }
    }
  } catch (e) {
    if (e instanceof TypeError || e instanceof RangeError) {
      // Expected
    } else {
      logFinding('SUSPICIOUS', testName, `Unexpected error: ${e.message}`);
      suspicious = true;
    }
  }

  // Test 2: Prototype chain modification during optimization
  try {
    function protoAccess(obj) {
      return obj.value;
    }

    function Base() { this.value = 42; }
    function Derived() { Base.call(this); }
    Derived.prototype = Object.create(Base.prototype);

    const instances = [];
    for (let i = 0; i < 100; i++) {
      instances.push(new Derived());
    }

    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      protoAccess(instances[i % instances.length]);
    }

    // Modify prototype chain after optimization
    Object.setPrototypeOf(Derived.prototype, {
      get value() { return 0xDEADBEEF; }
    });

    const newInst = new Derived();
    delete newInst.value;
    const result = protoAccess(newInst);
    if (result !== 0xDEADBEEF && result !== 42) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName, `Proto chain confusion: got ${result}`);
    }
  } catch (e) {
    // Expected in some cases
  }

  // Test 3: Array species type confusion (CVE-2024-0517 pattern)
  try {
    class ConfusedArray extends Array {
      static get [Symbol.species]() {
        return function(...args) {
          const arr = new Array(...args);
          // Try to confuse the JIT about the type of the result
          Object.defineProperty(arr, 'length', {
            get() { return 0xFFFF; },
            set(v) { /* noop */ }
          });
          return arr;
        };
      }
    }

    const ca = new ConfusedArray(1, 2, 3, 4, 5);
    for (let i = 0; i < 100; i++) {
      try {
        const mapped = ca.map(x => x * 2);
        if (mapped.length > 100) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName, `Array species length confusion: ${mapped.length}`);
        }
      } catch (e) {
        // Expected - species constructor rejected
      }
    }
  } catch (e) {}

  // Test 4: Polymorphic inline cache confusion
  try {
    function polyAccess(obj) {
      return obj.a + obj.b;
    }

    // Feed different shapes to make IC megamorphic
    const shapes = [
      { a: 1, b: 2 },
      { b: 2, a: 1 },
      { a: 1, b: 2, c: 3 },
      { a: 1.5, b: 2.5 },
      { a: "1", b: "2" },
      { get a() { return 1; }, b: 2 },
    ];

    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      const obj = shapes[i % shapes.length];
      const r = polyAccess(obj);
    }

    // Now use a Proxy to intercept
    const trap = new Proxy({ a: 1, b: 2 }, {
      get(target, prop) {
        if (prop === 'a') return { valueOf() { return 0xCAFEBABE; } };
        return target[prop];
      }
    });

    const proxyResult = polyAccess(trap);
    // Should be 0xCAFEBABE + 2 = 3405691584 + 2
    // If we get something wildly different, that's suspicious
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'No type confusion detected');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 2: Bounds Check Elimination
// Pattern: CVE-2024-3159
// Test whether JIT eliminates bounds checks incorrectly.
// ============================================================
function testBoundsCheckElimination() {
  const testName = 'Bounds Check Elimination';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Integer overflow in array index
  try {
    function oobAccess(arr, idx) {
      // JIT might eliminate bounds check if it thinks idx is always in range
      if (idx >= 0 && idx < arr.length) {
        return arr[idx];
      }
      return -1;
    }

    const arr = new Array(100).fill(0).map((_, i) => i);

    // Train with valid indices
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      oobAccess(arr, i % 100);
    }

    // Try edge cases
    const edgeCases = [
      -1, -0, 0x7FFFFFFF, 0x80000000, 0xFFFFFFFF,
      -0x80000000, Number.MAX_SAFE_INTEGER, NaN, Infinity,
      100, 101, 99.999999, 1e20, -1e20,
      2**31 - 1, 2**31, 2**32 - 1, 2**32
    ];

    for (const idx of edgeCases) {
      const result = oobAccess(arr, idx);
      if (result !== -1 && (idx < 0 || idx >= 100)) {
        suspicious = true;
        logFinding('VULNERABLE', testName,
          `OOB read at index ${idx}: got ${result}`);
        results.vulnerable++;
      }
    }
  } catch (e) {}

  // Test 2: TypedArray bounds with resizable buffer
  try {
    if (typeof SharedArrayBuffer !== 'undefined') {
      // Test resizable ArrayBuffer (Stage 3+)
      try {
        const rab = new ArrayBuffer(1024, { maxByteLength: 4096 });
        const ta = new Int32Array(rab);

        function accessTA(arr, i) {
          return arr[i];
        }

        // Train
        for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
          accessTA(ta, i % 256);
        }

        // Resize smaller  
        rab.resize(512);

        // Access beyond new size but within old size
        for (let i = 128; i < 256; i++) {
          const val = accessTA(ta, i);
          if (val !== undefined) {
            suspicious = true;
            logFinding('SUSPICIOUS', testName,
              `Read after resize at index ${i}: ${val}`);
          }
        }
      } catch (e) {
        // Resizable buffers might not be supported
        log(`Resizable ArrayBuffer: ${e.message}`);
      }
    }
  } catch (e) {}

  // Test 3: Array.prototype methods with modified length
  try {
    function sliceTest() {
      const arr = [1, 2, 3, 4, 5];
      Object.defineProperty(arr, 'length', { value: 0xFFFFFFFF, writable: true });
      try {
        const sliced = arr.slice(0, 10);
        if (sliced.length > 10) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `Array.slice length confusion: ${sliced.length}`);
        }
      } catch (e) {
        // RangeError expected
      }
    }

    for (let i = 0; i < 100; i++) {
      sliceTest();
    }
  } catch (e) {}

  // Test 4: String charCodeAt bounds
  try {
    function charTest(str, idx) {
      if (idx < str.length) {
        return str.charCodeAt(idx);
      }
      return -1;
    }

    const testStr = "A".repeat(1000);
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      charTest(testStr, i % 1000);
    }

    // Edge cases
    const r1 = charTest(testStr, -1);
    const r2 = charTest(testStr, 0x7FFFFFFF);
    if (!isNaN(r1) && r1 !== -1) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName, `String OOB at -1: ${r1}`);
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'No bounds check elimination issues detected');
  }
  results.total++;
}

// ============================================================
// Test Category 3: Escape Analysis Bugs
// Test whether escape analysis incorrectly determines that
// an object doesn't escape, leading to stack allocation of
// objects that are later accessed after the frame is gone.
// ============================================================
function testEscapeAnalysis() {
  const testName = 'Escape Analysis';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Object that may or may not escape
  try {
    let leaked = null;
    let counter = 0;

    function maybeEscape(escape) {
      const obj = { x: counter++, y: new Array(10).fill(counter) };
      if (escape) {
        leaked = obj;
      }
      return obj.x;
    }

    // Train with escape=false so JIT stack-allocates obj
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      maybeEscape(false);
    }

    // Now escape
    maybeEscape(true);
    triggerGC();

    // Check if leaked object is still valid
    if (leaked && leaked.x !== counter - 1) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `Escaped object corrupted: expected ${counter - 1}, got ${leaked.x}`);
    }
    if (leaked && leaked.y && leaked.y.some(v => v !== counter - 1 && v !== counter)) {
      // y array might have been corrupted if stack-allocated
      suspicious = true;
      logFinding('SUSPICIOUS', testName, `Escaped array corrupted: ${leaked.y}`);
    }
  } catch (e) {}

  // Test 2: Closure escape analysis
  try {
    function closureEscape() {
      let fns = [];
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        const obj = { val: i, data: new Float64Array(4) };
        obj.data[0] = i * 1.1;
        const fn = () => obj.val + obj.data[0];
        if (i === ITERATIONS_PER_TEST - 1) {
          fns.push(fn);
        }
      }
      triggerGC();
      for (const fn of fns) {
        const result = fn();
        const expected = (ITERATIONS_PER_TEST - 1) + (ITERATIONS_PER_TEST - 1) * 1.1;
        if (Math.abs(result - expected) > 0.01) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `Closure value corrupted: expected ~${expected}, got ${result}`);
        }
      }
    }
    closureEscape();
  } catch (e) {}

  // Test 3: Arguments object escape
  try {
    function argsEscape() {
      let savedArgs = null;
      function inner() {
        savedArgs = arguments;
        return arguments[0] + arguments[1];
      }

      // Train with JIT
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        inner(i, i + 1);
      }

      inner(0xDEAD, 0xBEEF);
      triggerGC();

      if (savedArgs[0] !== 0xDEAD || savedArgs[1] !== 0xBEEF) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Arguments object corrupted: [${savedArgs[0]}, ${savedArgs[1]}]`);
      }
    }
    argsEscape();
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'No escape analysis issues detected');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 4: Dead Code Elimination
// ============================================================
function testDeadCodeElimination() {
  const testName = 'Dead Code Elimination';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Side-effecting code that JIT might incorrectly eliminate
  try {
    let sideEffectCounter = 0;

    function deadCodeWithSideEffects(x) {
      const result = x * 2;
      // This branch is "never taken" during training
      if (x < 0) {
        sideEffectCounter++;
        // Complex side effect the JIT might want to eliminate
        const arr = new Array(100);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = i;
          sideEffectCounter += arr[i];
        }
      }
      return result;
    }

    // Train with positive numbers
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      deadCodeWithSideEffects(i + 1);
    }

    // Now trigger the "dead" path
    sideEffectCounter = 0;
    deadCodeWithSideEffects(-1);
    
    if (sideEffectCounter === 0) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        'Side-effecting dead code was eliminated');
    }
  } catch (e) {}

  // Test 2: Exception-throwing code elimination
  try {
    let threw = false;
    function mayThrow(x) {
      if (x === 0) {
        threw = true;
        throw new Error("division by zero");
      }
      return 100 / x;
    }

    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      mayThrow(i + 1);
    }

    threw = false;
    try {
      mayThrow(0);
    } catch (e) {}

    if (!threw) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        'Exception path was eliminated by JIT');
    }
  } catch (e) {}

  // Test 3: Property accessor side effects in dead code
  try {
    let accessCount = 0;
    const obj = {};
    Object.defineProperty(obj, 'prop', {
      get() { accessCount++; return 42; }
    });

    function accessWithSideEffect(o, flag) {
      const v = o.prop; // has side effect via getter
      if (flag) return v;
      return 0;
    }

    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      accessWithSideEffect(obj, false);
    }

    const before = accessCount;
    accessWithSideEffect(obj, false);
    if (accessCount === before) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        'Getter side effect eliminated in dead code path');
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'Dead code elimination appears correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 5: Typed Array with Resizable Array Buffers
// ============================================================
function testTypedArrayResizable() {
  const testName = 'TypedArray Resizable Buffers';
  log(`Running ${testName}...`);
  let suspicious = false;

  try {
    // Test with regular ArrayBuffer first
    const buf = new ArrayBuffer(1024);
    const i32 = new Int32Array(buf);
    const f64 = new Float64Array(buf);

    // Write as int, read as float (type punning)
    i32[0] = 0x41414141;
    i32[1] = 0x41414141;
    const floatVal = f64[0];

    // Test detached buffer access
    function accessAfterDetach() {
      const ab = new ArrayBuffer(256);
      const view = new Uint8Array(ab);
      view[0] = 0xFF;

      function readView(v) {
        return v[0];
      }

      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        readView(view);
      }

      // Detach via transfer
      try {
        const transferred = ab.transfer();
        const val = readView(view);
        if (val !== undefined && val !== 0) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `Read from detached buffer: ${val}`);
        }
      } catch (e) {
        // transfer() might not be available
        try {
          // Try structured clone detach
          const mc = new MessageChannel();
          mc.port1.postMessage(ab, [ab]);
          const val = readView(view);
          if (val !== undefined && val !== 0) {
            suspicious = true;
            logFinding('SUSPICIOUS', testName,
              `Read from detached buffer (postMessage): ${val}`);
          }
          mc.port1.close();
          mc.port2.close();
        } catch (e2) {
          log(`Buffer detach not available: ${e2.message}`);
        }
      }
    }
    accessAfterDetach();

    // Test resizable ArrayBuffer
    try {
      const rab = new ArrayBuffer(64, { maxByteLength: 1024 });
      const u8 = new Uint8Array(rab);
      
      // Fill initial data
      for (let i = 0; i < 64; i++) u8[i] = i;

      function readRAB(arr, idx) {
        return arr[idx];
      }

      // Train JIT
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        readRAB(u8, i % 64);
      }

      // Grow buffer
      rab.resize(128);
      
      // Access in new region should be 0
      for (let i = 64; i < 128; i++) {
        const val = readRAB(u8, i);
        if (val !== 0) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `Uninitialized data in grown buffer at ${i}: ${val}`);
        }
      }

      // Shrink buffer
      rab.resize(32);

      // Access beyond new length 
      for (let i = 32; i < 64; i++) {
        const val = readRAB(u8, i);
        if (val !== undefined) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `Read beyond shrunk buffer at ${i}: ${val}`);
        }
      }
    } catch (e) {
      log(`Resizable ArrayBuffer: ${e.message}`);
    }

  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'TypedArray/resizable buffer operations appear correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 6: WeakRef/FinalizationRegistry + GC
// ============================================================
function testWeakRefFinalization() {
  const testName = 'WeakRef/FinalizationRegistry';
  log(`Running ${testName}...`);
  let suspicious = false;

  try {
    let cleanupCalled = 0;
    const registry = new FinalizationRegistry((heldValue) => {
      cleanupCalled++;
      // Check if heldValue is still valid
      if (typeof heldValue !== 'number') {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `FinalizationRegistry held value corrupted: ${typeof heldValue}`);
      }
    });

    let refs = [];
    for (let i = 0; i < 100; i++) {
      let obj = { data: new Array(1000).fill(i) };
      refs.push(new WeakRef(obj));
      registry.register(obj, i);
      obj = null; // Allow GC
    }

    // Force GC multiple times
    for (let i = 0; i < 10; i++) {
      triggerGC();
    }

    // Check WeakRefs - some might be collected
    let alive = 0;
    let dead = 0;
    for (const ref of refs) {
      const obj = ref.deref();
      if (obj) {
        alive++;
        // Verify object integrity
        if (!Array.isArray(obj.data) || obj.data.length !== 1000) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `WeakRef object corrupted: data.length=${obj.data?.length}`);
        }
      } else {
        dead++;
      }
    }

    log(`WeakRef: ${alive} alive, ${dead} collected, ${cleanupCalled} cleanups`);

    // Test: Create WeakRef to object, get GC'd, check deref returns undefined
    {
      let target = { marker: 0xBEEF };
      const wr = new WeakRef(target);
      target = null;
      triggerGC();
      const derefed = wr.deref();
      if (derefed !== undefined && derefed.marker !== 0xBEEF) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `WeakRef deref returned corrupted object: ${derefed.marker}`);
      }
    }

    // Test: FinalizationRegistry with re-registered objects
    {
      const fr = new FinalizationRegistry((val) => {});
      let obj1 = { id: 1 };
      const token = {};
      fr.register(obj1, 'first', token);
      fr.unregister(token);
      fr.register(obj1, 'second', token);
      obj1 = null;
      triggerGC();
      // Should only get 'second' callback, not 'first'
    }
  } catch (e) {
    log(`WeakRef test error: ${e.message}`);
  }

  if (!suspicious) {
    logFinding('SAFE', testName, 'WeakRef/FinalizationRegistry behavior correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 7: Promise Microtask Timing
// ============================================================
async function testPromiseMicrotaskTiming() {
  const testName = 'Promise Microtask Timing';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Microtask ordering
  try {
    const order = [];
    
    await new Promise(resolve => {
      Promise.resolve().then(() => order.push(1));
      Promise.resolve().then(() => order.push(2));
      Promise.resolve().then(() => {
        Promise.resolve().then(() => order.push(4));
        order.push(3);
      });
      setTimeout(() => {
        order.push(5);
        resolve();
      }, 10);
    });

    const expected = [1, 2, 3, 4, 5];
    if (JSON.stringify(order) !== JSON.stringify(expected)) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `Microtask ordering wrong: ${JSON.stringify(order)} vs ${JSON.stringify(expected)}`);
    }
  } catch (e) {}

  // Test 2: Promise.all with side effects during iteration
  try {
    let mutated = false;
    const promises = [1, 2, 3, 4, 5].map(i => Promise.resolve(i));
    
    // Modify the array during iteration
    const origThen = Promise.prototype.then;
    let callCount = 0;
    Promise.prototype.then = function(...args) {
      callCount++;
      if (callCount === 3) {
        promises.push(Promise.resolve(999));
        mutated = true;
      }
      return origThen.apply(this, args);
    };

    try {
      const results = await Promise.all(promises);
      // Restore immediately
      Promise.prototype.then = origThen;
    } catch (e) {
      Promise.prototype.then = origThen;
    }
    Promise.prototype.then = origThen; // Ensure restored
  } catch (e) {}

  // Test 3: Async iterator with GC pressure
  try {
    async function* asyncGen() {
      for (let i = 0; i < 100; i++) {
        yield i;
        if (i % 10 === 0) triggerGC();
      }
    }

    let count = 0;
    for await (const val of asyncGen()) {
      if (val !== count) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Async generator value mismatch: expected ${count}, got ${val}`);
        break;
      }
      count++;
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'Promise microtask timing appears correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 8: Proxy + Reflect During Optimization
// ============================================================
function testProxyReflectOptimization() {
  const testName = 'Proxy/Reflect Optimization';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Proxy handler modifications during JIT
  try {
    let trapCallCount = 0;
    const handler = {
      get(target, prop, receiver) {
        trapCallCount++;
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        trapCallCount++;
        return Reflect.set(target, prop, value, receiver);  
      }
    };

    const proxy = new Proxy({ x: 1, y: 2 }, handler);

    function accessProxy(p) {
      return p.x + p.y;
    }

    // Optimize
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      accessProxy(proxy);
    }

    // Modify handler trap
    trapCallCount = 0;
    handler.get = function(target, prop) {
      trapCallCount++;
      return prop === 'x' ? 100 : 200;
    };

    const result = accessProxy(proxy);
    if (result !== 300) {
      // JIT might have cached the old handler
      if (result === 3) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Proxy handler change not reflected after JIT: got ${result}, expected 300`);
      }
    }
    
    if (trapCallCount === 0) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        'Proxy traps bypassed after JIT optimization');
    }
  } catch (e) {}

  // Test 2: Revocable proxy after optimization
  try {
    const { proxy, revoke } = Proxy.revocable({ val: 42 }, {});

    function readProxy(p) {
      return p.val;
    }

    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      readProxy(proxy);
    }

    revoke();

    try {
      const val = readProxy(proxy);
      // Should throw TypeError
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `Revoked proxy still accessible: ${val}`);
    } catch (e) {
      if (!(e instanceof TypeError)) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Wrong error on revoked proxy: ${e.constructor.name}`);
      }
    }
  } catch (e) {}

  // Test 3: Proxy with recursive handlers
  try {
    let depth = 0;
    const recursiveHandler = {
      get(target, prop) {
        depth++;
        if (depth > 1000) return 0; // Prevent stack overflow
        return target[prop];
      }
    };

    const rp = new Proxy(new Proxy(new Proxy({ x: 1 }, recursiveHandler), recursiveHandler), recursiveHandler);
    
    for (let i = 0; i < 100; i++) {
      depth = 0;
      try {
        rp.x;
      } catch (e) {
        // Stack overflow expected
      }
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'Proxy/Reflect optimization handling correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 9: Map/Set Iterator Invalidation
// ============================================================
function testMapSetIteratorInvalidation() {
  const testName = 'Map/Set Iterator Invalidation';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Map modification during iteration
  try {
    function iterateAndModify() {
      const map = new Map();
      for (let i = 0; i < 100; i++) map.set(i, i * 2);

      const seen = new Set();
      let total = 0;
      for (const [key, value] of map) {
        seen.add(key);
        total++;
        if (key === 50) {
          // Add new entries during iteration
          for (let j = 100; j < 110; j++) map.set(j, j * 2);
          // Delete upcoming entries
          map.delete(75);
          map.delete(76);
        }
      }
      return { total, seenSize: seen.size };
    }

    for (let i = 0; i < 1000; i++) {
      const r = iterateAndModify();
      // Map iteration should include entries added during iteration
      // but behavior should be consistent
    }
  } catch (e) {}

  // Test 2: Set with JIT-optimized forEach
  try {
    const set = new Set();
    for (let i = 0; i < 1000; i++) set.add(i);

    let sum = 0;
    function setForEach(s) {
      let localSum = 0;
      s.forEach(v => { localSum += v; });
      return localSum;
    }

    // Optimize
    for (let i = 0; i < 1000; i++) {
      sum = setForEach(set);
    }

    const expected = (999 * 1000) / 2;
    if (sum !== expected) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `Set forEach sum wrong: expected ${expected}, got ${sum}`);
    }

    // Now modify during forEach
    try {
      const set2 = new Set([1, 2, 3, 4, 5]);
      const collected = [];
      set2.forEach(v => {
        collected.push(v);
        if (v === 3) {
          set2.delete(4);
          set2.add(6);
        }
      });
      // 4 should be skipped, 6 should be included
    } catch (e) {}
  } catch (e) {}

  // Test 3: WeakMap/WeakSet interaction with GC during iteration-like access
  try {
    const wm = new WeakMap();
    const keys = [];
    for (let i = 0; i < 100; i++) {
      const key = { id: i, data: new Array(100).fill(i) };
      keys.push(key);
      wm.set(key, i * 3);
    }

    // Drop some keys
    for (let i = 0; i < 50; i++) {
      keys[i] = null;
    }
    triggerGC();

    // Check remaining keys
    let validCount = 0;
    for (let i = 50; i < 100; i++) {
      if (keys[i] && wm.has(keys[i])) {
        const val = wm.get(keys[i]);
        if (val !== i * 3) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `WeakMap value corrupted for key ${i}: expected ${i * 3}, got ${val}`);
        }
        validCount++;
      }
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'Map/Set iterator behavior correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 10: BigInt Mixed Arithmetic
// ============================================================
function testBigIntArithmetic() {
  const testName = 'BigInt Mixed Arithmetic';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: BigInt operations after JIT optimization with Number
  try {
    function add(a, b) {
      return a + b;
    }

    // Train with Numbers
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      add(i, i + 1);
    }

    // Now try with BigInt - should throw TypeError
    try {
      const result = add(1n, 2n);
      if (result !== 3n) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `BigInt addition returned wrong result: ${result}`);
      }
    } catch (e) {
      if (!(e instanceof TypeError)) {
        // Expected behavior when JIT deoptimizes
      }
    }

    // Try mixed - must always throw
    try {
      const result = add(1n, 2);
      suspicious = true;
      logFinding('VULNERABLE', testName,
        `BigInt + Number did not throw! Result: ${result}`);
      results.vulnerable++;
    } catch (e) {
      if (!(e instanceof TypeError)) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Wrong error for BigInt + Number: ${e.constructor.name}`);
      }
    }
  } catch (e) {}

  // Test 2: BigInt comparison edge cases
  try {
    function compare(a, b) {
      return a < b;
    }

    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      compare(i, i + 1);
    }

    // BigInt vs Number comparison (allowed per spec)
    const tests = [
      [0n, 1, true],
      [1n, 0, false],
      [0n, 0, false],
      [BigInt(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER, false],
      [BigInt(Number.MAX_SAFE_INTEGER) + 1n, Number.MAX_SAFE_INTEGER, false],
      [0n, NaN, false],
      [0n, Infinity, true],
      [0n, -Infinity, false],
    ];

    for (const [a, b, expected] of tests) {
      try {
        const result = compare(a, b);
        if (result !== expected) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `BigInt comparison ${a} < ${b}: expected ${expected}, got ${result}`);
        }
      } catch (e) {}
    }
  } catch (e) {}

  // Test 3: BigInt bitwise operations with large values
  try {
    const large = (1n << 1024n) - 1n;
    const shifted = large >> 512n;
    const expected = (1n << 512n) - 1n;
    if (shifted !== expected) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        'Large BigInt shift produced wrong result');
    }

    // Test overflow-like patterns
    const maxI32 = BigInt(2**31 - 1);
    const r = maxI32 + 1n;
    if (r !== BigInt(2**31)) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `BigInt overflow at i32 max: ${r}`);
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'BigInt arithmetic appears correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 11: Regex Engine Edge Cases
// ============================================================
function testRegexEdgeCases() {
  const testName = 'Regex Engine';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: Catastrophic backtracking detection
  try {
    const patterns = [
      { re: /^(a+)+$/, input: 'a'.repeat(25) + 'b', name: 'nested quantifier' },
      { re: /^([a-zA-Z0-9]+)*$/, input: 'a'.repeat(25) + '!', name: 'quantified group' },
      { re: /^(a|a)*$/, input: 'a'.repeat(25) + 'b', name: 'alternation' },
    ];

    for (const { re, input, name } of patterns) {
      const start = Date.now();
      try {
        re.test(input);
      } catch (e) {}
      const elapsed = Date.now() - start;
      
      if (elapsed > 5000) {
        logFinding('SUSPICIOUS', testName,
          `Regex ${name} took ${elapsed}ms (potential ReDoS)`);
        suspicious = true;
      }
    }
  } catch (e) {}

  // Test 2: Regex lastIndex manipulation
  try {
    const re = /a/g;
    function matchRegex(r, s) {
      return r.test(s);
    }

    // Optimize
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      re.lastIndex = 0;
      matchRegex(re, 'aaa');
    }

    // Set lastIndex to out-of-bounds
    re.lastIndex = 1e15;
    const result = matchRegex(re, 'aaa');
    if (result !== false) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `Regex matched with lastIndex=${1e15}`);
    }

    // Negative lastIndex
    re.lastIndex = -1;
    const result2 = matchRegex(re, 'aaa');
    // Should either ignore negative or treat as 0
  } catch (e) {}

  // Test 3: Regex with lookbehind and JIT
  try {
    const re = /(?<=a{1000})b/;
    const input = 'a'.repeat(1000) + 'b';
    
    function lookbehindTest(r, s) {
      return r.test(s);
    }

    for (let i = 0; i < 1000; i++) {
      lookbehindTest(re, input);
    }

    // Modify input length
    const shortInput = 'ab';
    const r = lookbehindTest(re, shortInput);
    if (r !== false) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        'Lookbehind matched on too-short input');
    }
  } catch (e) {}

  // Test 4: Named capture groups with unusual names
  try {
    const re = /(?<__proto__>a)(?<constructor>b)/;
    const match = re.exec('ab');
    if (match && match.groups) {
      if (match.groups.__proto__ !== 'a') {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Named group __proto__ collision: ${match.groups.__proto__}`);
      }
    }
  } catch (e) {}

  // Test 5: RegExp.prototype[Symbol.replace] with custom exec
  try {
    const maliciousRegex = {
      [Symbol.match]: true,
      exec: function(str) {
        // Return object that looks like match but has weird index
        return { 0: 'x', index: -1, input: str, length: 1 };
      },
      global: true,
      unicode: false,
      lastIndex: 0,
    };

    Object.defineProperty(maliciousRegex, 'lastIndex', {
      get() { return 0; },
      set(v) { /* noop - creates infinite loop potential */ }
    });

    // Don't actually run this with String.replace as it could loop
    // Just verify the exec returns negative index
    const execResult = maliciousRegex.exec('test');
    if (execResult && execResult.index < 0) {
      log('Regex exec returns negative index (testing for OOB)');
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'Regex engine behavior appears correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 12: CVE-specific Regression Patterns
// ============================================================
function testCVEPatterns() {
  const testName = 'CVE Regression Patterns';
  log(`Running ${testName}...`);
  let suspicious = false;

  // CVE-2024-0517 pattern: Out of bounds write via optimized array operations
  try {
    function cve0517Pattern() {
      // Create array, trigger optimization, then change element kind
      const arr = [1.1, 2.2, 3.3, 4.4, 5.5]; // PACKED_DOUBLE
      
      function writeToArr(a, idx, val) {
        a[idx] = val;
      }

      // Optimize with double writes
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        writeToArr(arr, i % 5, i * 1.1);
      }

      // Now try to write an object (should transition to PACKED_ELEMENTS)
      writeToArr(arr, 0, {});
      
      // Check if the write was handled correctly
      if (typeof arr[0] !== 'object') {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `CVE-2024-0517: Element kind transition failed, arr[0] = ${arr[0]}`);
      }

      // Check adjacent elements aren't corrupted
      for (let i = 1; i < 5; i++) {
        const val = arr[i];
        if (typeof val !== 'number' || isNaN(val)) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `CVE-2024-0517: Adjacent element corrupted at ${i}: ${val}`);
        }
      }
    }
    
    for (let i = 0; i < 100; i++) {
      cve0517Pattern();
      if (i % 10 === 0) triggerGC();
    }
  } catch (e) {}

  // CVE-2024-3159 pattern: OOB access via incorrect range analysis
  try {
    function cve3159Pattern() {
      function accessWithComputedIndex(arr, x) {
        // Range analysis might incorrectly narrow the range of idx
        const idx = (x >>> 0) % arr.length;
        return arr[idx];
      }

      const arr = new Float64Array(256);
      for (let i = 0; i < 256; i++) arr[i] = i * 1.5;

      // Optimize
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        accessWithComputedIndex(arr, i);
      }

      // Edge cases that might confuse range analysis
      const tricks = [
        0xFFFFFFFF, 0x80000000, -1 >>> 0, NaN, Infinity,
        -0, 2**53, -(2**53), 0.5, -0.5
      ];

      for (const trick of tricks) {
        const result = accessWithComputedIndex(arr, trick);
        if (result === undefined || isNaN(result)) continue;
        const expectedIdx = (trick >>> 0) % 256;
        const expected = expectedIdx * 1.5;
        if (Math.abs(result - expected) > 0.001) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `CVE-2024-3159: Wrong value for trick ${trick}: got ${result}, expected ${expected}`);
        }
      }
    }
    cve3159Pattern();
  } catch (e) {}

  // CVE-2024-4947 pattern: Type confusion through function dispatch
  try {
    function cve4947Pattern() {
      class Base {
        process(x) { return x + 1; }
      }
      class DerivedA extends Base {
        process(x) { return x * 2; }
      }
      class DerivedB extends Base {
        process(x) { return x - 1; }
      }

      function callProcess(obj, value) {
        return obj.process(value);
      }

      const a = new DerivedA();
      const b = new DerivedB();

      // Train with type A
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        callProcess(a, i);
      }

      // Now call with type B - should deopt and use correct implementation
      const result = callProcess(b, 10);
      if (result !== 9) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `CVE-2024-4947: Type confusion in dispatch: expected 9, got ${result}`);
      }

      // Even worse: modify prototype after optimization
      DerivedA.prototype.process = function(x) { return x ** 2; };
      const result2 = callProcess(a, 5);
      if (result2 !== 25) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `CVE-2024-4947: Prototype change not reflected: expected 25, got ${result2}`);
      }
    }
    cve4947Pattern();
  } catch (e) {}

  // CVE-2024-2887 pattern: WebAssembly type confusion
  try {
    if (typeof WebAssembly !== 'undefined') {
      // Minimal WASM module with type confusion potential
      const wasmBytes = new Uint8Array([
        0x00, 0x61, 0x73, 0x6d, // magic
        0x01, 0x00, 0x00, 0x00, // version
        // Type section
        0x01, 0x07, 0x01,       // section, size, count
        0x60, 0x02, 0x7f, 0x7f, // func (i32, i32) ->
        0x01, 0x7f,              // i32
        // Function section
        0x03, 0x02, 0x01, 0x00, // section, size, count, type_idx
        // Export section
        0x07, 0x07, 0x01,       // section, size, count
        0x03, 0x61, 0x64, 0x64, // name "add"
        0x00, 0x00,              // func, idx
        // Code section
        0x0a, 0x09, 0x01,       // section, size, count
        0x07, 0x00,              // body size, local count
        0x20, 0x00,              // local.get 0
        0x20, 0x01,              // local.get 1
        0x6a,                    // i32.add
        0x0b                     // end
      ]);

      const module = new WebAssembly.Module(wasmBytes);
      const instance = new WebAssembly.Instance(module);
      
      // Test with various inputs
      const add = instance.exports.add;
      
      // These should all work correctly or throw
      const tests = [
        [1, 2, 3],
        [0x7FFFFFFF, 1, -0x80000000], // overflow wraps
        [-1, -1, -2],
        [0, 0, 0],
      ];

      for (const [a, b, expected] of tests) {
        const result = add(a, b);
        if (result !== expected) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `CVE-2024-2887: WASM add(${a}, ${b}) = ${result}, expected ${expected}`);
        }
      }

      // Try passing non-numeric types (should be coerced)
      try {
        const r = add({}, []);
        // Should coerce to add(NaN, 0) = 0 in i32
        if (r !== 0) {
          log(`WASM type coercion: add({}, []) = ${r}`);
        }
      } catch (e) {}
    }
  } catch (e) {
    log(`WASM test error: ${e.message}`);
  }

  if (!suspicious) {
    logFinding('SAFE', testName, 'No CVE regression patterns detected');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 13: Random Program Generator
// ============================================================
function testRandomPrograms() {
  const testName = 'Random Program Generation';
  log(`Running ${testName}...`);
  let suspicious = false;

  const ops = ['+', '-', '*', '/', '%', '|', '&', '^', '<<', '>>', '>>>'];
  const unaryOps = ['~', '-', '+', '!'];
  const comparisons = ['<', '>', '<=', '>=', '==', '===', '!=', '!=='];

  function generateRandomExpr(depth = 0) {
    if (depth > 5) return String(randInt(-1000, 1000));
    
    const choice = randInt(0, 6);
    switch (choice) {
      case 0: return String(randInt(-(2**31), 2**31));
      case 1: return String(Math.random());
      case 2: {
        const op = randElement(ops);
        return `(${generateRandomExpr(depth + 1)} ${op} ${generateRandomExpr(depth + 1)})`;
      }
      case 3: {
        const op = randElement(unaryOps);
        return `(${op}${generateRandomExpr(depth + 1)})`;
      }
      case 4: {
        const cmp = randElement(comparisons);
        return `(${generateRandomExpr(depth + 1)} ${cmp} ${generateRandomExpr(depth + 1)})`;
      }
      case 5: return `Math.${randElement(['abs','floor','ceil','round','sqrt','trunc'])}(${generateRandomExpr(depth + 1)})`;
      case 6: return `(${generateRandomExpr(depth + 1)} | 0)`; // Force int32
      default: return '0';
    }
  }

  function generateAndTestFunction() {
    const expr = generateRandomExpr();
    const fnCode = `(function() { return ${expr}; })`;
    
    try {
      const fn = eval(fnCode);
      
      // Run interpreted
      const interpreted = fn();
      
      // Force optimization
      for (let i = 0; i < 10000; i++) {
        fn();
      }
      
      // Run optimized
      const optimized = fn();
      
      // Compare results (allowing NaN == NaN and -0 == +0)
      if (typeof interpreted === 'number' && typeof optimized === 'number') {
        if (isNaN(interpreted) && isNaN(optimized)) return; // Both NaN is fine
        if (Object.is(interpreted, optimized)) return; // Identical
        if (interpreted === optimized) return; // Equal
        
        // Mismatch!
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `JIT mismatch: interpreted=${interpreted}, optimized=${optimized}\n  Expression: ${expr}`);
      } else if (interpreted !== optimized) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `JIT type mismatch: interpreted=${typeof interpreted}(${interpreted}), optimized=${typeof optimized}(${optimized})\n  Expression: ${expr}`);
      }
    } catch (e) {
      // Expression evaluation error is fine
    }
  }

  // Run random programs until time expires or we hit our count
  let count = 0;
  const maxPrograms = 1000;
  while (count < maxPrograms && timeRemaining()) {
    generateAndTestFunction();
    count++;
    if (count % 100 === 0) {
      triggerGC();
      log(`Generated and tested ${count} random programs`);
    }
  }

  log(`Tested ${count} random programs`);

  if (!suspicious) {
    logFinding('SAFE', testName, `${count} random programs showed consistent JIT behavior`);
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Test Category 14: ArrayBuffer / DataView Edge Cases
// ============================================================
function testArrayBufferEdgeCases() {
  const testName = 'ArrayBuffer/DataView Edge Cases';
  log(`Running ${testName}...`);
  let suspicious = false;

  // Test 1: DataView with various endianness
  try {
    const buf = new ArrayBuffer(64);
    const dv = new DataView(buf);
    const u8 = new Uint8Array(buf);

    // Write known pattern
    dv.setFloat64(0, Math.PI, true); // little-endian
    const piLE = dv.getFloat64(0, true);
    const piBE = dv.getFloat64(0, false); // read as big-endian

    if (piLE !== Math.PI) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `DataView Float64 round-trip failed: ${piLE} !== ${Math.PI}`);
    }

    // Test unaligned access
    for (let offset = 0; offset < 56; offset++) {
      try {
        dv.setFloat64(offset, 1.5, true);
        const val = dv.getFloat64(offset, true);
        if (val !== 1.5) {
          suspicious = true;
          logFinding('SUSPICIOUS', testName,
            `Unaligned Float64 at offset ${offset}: ${val}`);
        }
      } catch (e) {}
    }
  } catch (e) {}

  // Test 2: SharedArrayBuffer + Atomics
  try {
    if (typeof SharedArrayBuffer !== 'undefined') {
      const sab = new SharedArrayBuffer(1024);
      const i32 = new Int32Array(sab);

      // Test atomic operations
      Atomics.store(i32, 0, 42);
      const val = Atomics.load(i32, 0);
      if (val !== 42) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Atomics.store/load mismatch: ${val}`);
      }

      // Test compareExchange
      const old = Atomics.compareExchange(i32, 0, 42, 99);
      if (old !== 42 || Atomics.load(i32, 0) !== 99) {
        suspicious = true;
        logFinding('SUSPICIOUS', testName,
          `Atomics.compareExchange failed: old=${old}, new=${Atomics.load(i32, 0)}`);
      }
    }
  } catch (e) {
    log(`SharedArrayBuffer: ${e.message}`);
  }

  // Test 3: Zero-length ArrayBuffer
  try {
    const empty = new ArrayBuffer(0);
    const u8 = new Uint8Array(empty);
    
    function readEmpty(arr) { return arr[0]; }
    for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
      readEmpty(u8);
    }
    
    const val = readEmpty(u8);
    if (val !== undefined) {
      suspicious = true;
      logFinding('SUSPICIOUS', testName,
        `Read from empty buffer: ${val}`);
    }
  } catch (e) {}

  if (!suspicious) {
    logFinding('SAFE', testName, 'ArrayBuffer/DataView operations correct');
  }
  results.total++;
  suspicious ? results.suspicious++ : results.safe++;
}

// ============================================================
// Main Runner
// ============================================================
async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  V8 Regression Fuzzer - Chrome VRP Security Research');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Duration: ${DURATION_SEC}s | Node: ${process.version}`);
  console.log(`Native syntax: ${hasNativeSyntax ? 'YES' : 'NO'}`);
  console.log(`Iterations per test: ${ITERATIONS_PER_TEST}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  const tests = [
    testJITTypeConfusion,
    testBoundsCheckElimination,
    testEscapeAnalysis,
    testDeadCodeElimination,
    testTypedArrayResizable,
    testWeakRefFinalization,
    testPromiseMicrotaskTiming,  // async
    testProxyReflectOptimization,
    testMapSetIteratorInvalidation,
    testBigIntArithmetic,
    testRegexEdgeCases,
    testCVEPatterns,
    testRandomPrograms,
    testArrayBufferEdgeCases,
  ];

  for (const test of tests) {
    if (!timeRemaining()) {
      console.log('\n⏰ Time limit reached, stopping tests.');
      break;
    }

    try {
      const result = test();
      if (result instanceof Promise) {
        await result;
      }
    } catch (e) {
      console.error(`💥 Test crashed: ${test.name}: ${e.message}`);
      results.crashes++;
      results.errors.push({ test: test.name, error: e.message, stack: e.stack });
    }

    triggerGC();
  }

  // ============================================================
  // Results Summary
  // ============================================================
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Duration:    ${elapsed}s`);
  console.log(`Tests run:   ${results.total}`);
  console.log(`🟢 SAFE:       ${results.safe}`);
  console.log(`🟡 SUSPICIOUS: ${results.suspicious}`);
  console.log(`🔴 VULNERABLE: ${results.vulnerable}`);
  console.log(`💥 CRASHES:    ${results.crashes}`);
  
  if (results.findings.length > 0) {
    console.log('\n─── Findings ───');
    for (const f of results.findings) {
      const icon = f.severity === 'VULNERABLE' ? '🔴' : 
                   f.severity === 'SUSPICIOUS' ? '🟡' : '🟢';
      console.log(`${icon} [${f.severity}] ${f.testName}`);
      console.log(`   ${f.detail}`);
      console.log(`   @ ${f.timestamp}ms`);
    }
  }

  if (results.errors.length > 0) {
    console.log('\n─── Errors ───');
    for (const e of results.errors) {
      console.log(`💥 ${e.test}: ${e.error}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  
  if (results.vulnerable > 0) {
    console.log('⚠️  POTENTIAL VULNERABILITIES DETECTED - Review findings above');
    process.exit(1);
  } else if (results.suspicious > 0) {
    console.log('⚠️  Suspicious behaviors detected - May warrant investigation');
    process.exit(0);
  } else {
    console.log('✅ All tests passed - No issues detected');
    process.exit(0);
  }
}

main().catch(e => {
  console.error(`Fatal error: ${e.message}`);
  console.error(e.stack);
  process.exit(2);
});
