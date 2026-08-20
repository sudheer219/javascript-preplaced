// Function Execution Context
// Each function gets its own context with local variables

let globalVar = "I'm Global";

function myFunction() {
    let localVar = "I'm Local";
    const localConst = 100;
    
    debugger; // Set breakpoint here - check Scope panel
    console.log(localVar, localConst);
}

myFunction();
