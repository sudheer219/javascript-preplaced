// Scope Chain
// JS searches: Local → Outer Function → Global

let globalVar = "GLOBAL";

function outer() {
    let outerVar = "OUTER";

    function inner() {
        let innerVar = "INNER";
        
        debugger; // All 3 variables accessible via scope chain
        console.log(innerVar, outerVar, globalVar);
    }

    inner();
}

outer();
