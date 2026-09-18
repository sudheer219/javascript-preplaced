class Parent {}
class Child extends Parent {}

console.log(Object.getPrototypeOf(Child) === Parent); 
console.log(Object.getPrototypeOf(Child.prototype) === Parent.prototype);
