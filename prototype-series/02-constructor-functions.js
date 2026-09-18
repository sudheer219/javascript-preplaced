const Employee = function(name, salary, department) {
    this.name = name;
    this.salary = salary;
    this.department = department;
}

Employee.prototype.getDetails = function() {
    console.log(`Name: ${this.name}, Salary: ${this.salary}, Department: ${this.department}`);
}

const emp1 = new Employee("John", 50000, "Engineering");
const emp2 = new Employee("Jane", 60000, "Marketing"); // diffrent memory

const EmpPrototype= Employee.prototype;
const Emp1_Proto= emp1.__proto__;

console.log(emp1);
console.log("Employee.prototype: ", EmpPrototype); 
console.log("emp1.__proto__: ", Emp1_Proto); 

// console.log(EmpPrototype === Emp1_Proto);

console.log("getDetails" in emp1); // false
