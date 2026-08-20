// This Binding - Changes Based On How Function Is Called

const person = {
    name: "Alice",
    age: 25,
    greet: function() {
        debugger; // "this" refers to person object
        console.log("this:", this);
        console.log("this.name:", this.name);
    }
};

// Scenario 1: Method call - this = object
console.log("--- Scenario 1: Method Call ---");
person.greet();

// Scenario 2: Function call - this = undefined (strict) or window
console.log("\n--- Scenario 2: Function Call ---");
const detachedGreet = person.greet;
detachedGreet(); // this = undefined

// Scenario 3: Arrow function - this from enclosing scope
console.log("\n--- Scenario 3: Arrow Function ---");
const arrowGreet = () => {
    debugger; // "this" inherited from outer scope
    console.log("this:", this);
};
arrowGreet();
