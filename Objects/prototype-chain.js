import { trace } from './trace.js';

function Dog(name) {
  this.name = name;
}

const myDog = new Dog("Buddy");

// 🚀 Pass the variable name as the second argument!
trace.chain(myDog, "myDog"); 
