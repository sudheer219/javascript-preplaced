// Call Stack - Execution Order
// Shows the sequence of function calls

function functionA() {
    console.log("A started");
    functionB();
    console.log("A ended");
}

function functionB() {
    console.log("B started");
    functionC();
    console.log("B ended");
}

function functionC() {
    console.log("C started");
    debugger; // Check Call Stack in DevTools
    console.log("C ended");
}

functionA();
