
const Person = function(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person('Alice', 30);

console.log("%c p1.constructor ", 
  "background: #2968af; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold",`
  
  ${p1.constructor}
  `);

console.log("%c Person.prototype.constructor ", 
  "background: #481b54; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold",`
  
  ${Person.prototype.constructor}
  `);