// Closure - Function Remembers Parent Scope
// The inner function "closes over" the count variable

function createCounter() {
    let count = 0; // This stays alive in memory!

    return function increment() {
        count++;
        debugger; // Check Scope panel for "Closure"
        console.log("Count is:", count);
        return count;
    };
}

const counter = createCounter();
counter(); // logs 1
counter(); // logs 2
counter(); // logs 3
