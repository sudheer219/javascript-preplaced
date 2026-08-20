async function greet() {
    return "Hello"; 
}

console.log("A");

greet().then(value => console.log(value));

console.log("B");


// async makes the function return a Promise immediately, 
// When .then() is attached, the .then() callback is placed in the microtask queue and executes after the call stack becomes empty.