# JavaScript Learning Journey

## Learning style

The learning approach agreed during these discussions:

- Learn one concept at a time.
- Go line by line when reviewing code.
- Prefer small practical steps over large theory explanations.
- Use real-life examples and analogies.
- Write the code personally instead of receiving the final answer upfront.
- Receive mentor prompts, questions, and validation.
- Debug mistakes instead of skipping directly to the correct solution.
- Use visual explanations and flowcharts when a process is difficult to picture.

This style is especially important because the next goal is to become comfortable with the JavaScript concepts used by Angular and React.

## Phase 1: Array data and passenger records

We started with passenger data represented as an array of objects.

### Main idea

An object keeps one passenger's related information together:

- name
- age
- ticket number
- other passenger details

If every property is stored in a separate array, it becomes difficult to know which name belongs to which age or ticket. An array of objects keeps each passenger as one complete record.

### Real-life analogy

An airline passenger list is like a row of separate passenger folders. Each folder contains all information for one passenger. The array stores the folders, and each object is one folder.

### Related file

- [`passengerFilter.js`](./passengerFilter.js)

## Phase 2: Reusable filtering and callbacks

The next goal was to automate filtering so the same function could receive:

1. an array
2. a condition

This led to the reusable pattern represented by `automaticPassengerCheck(list, conditionFn)`.

### Main concepts

- A function can receive another function as an argument.
- The received function is called a callback.
- The outer function handles the repeated process.
- The callback supplies the changing rule.
- The same filtering process can be reused for different conditions.

### Conditions practiced

Different callback functions were used to check different passenger requirements, including conditions represented by `checkConditionA` and `checkConditionJ`.

We also compared the custom reusable function with JavaScript's native:

```js
array.filter(conditionFunction)
```

The native `filter` method follows the same general callback idea.

### Important correction: `charAt`

We clarified the difference between:

```js
charAt
```

and:

```js
charAt(0)
```

The first refers to the function object. The second invokes the function and asks for the character at index `0`.

`charAt[0]` does not invoke `charAt`; it tries to read property `"0"` from the function object and usually produces `undefined`.

## Phase 3: `map`

We used the same passenger data to practice `map`.

### Main idea

`map` visits every item and creates a new array containing a transformed result for every item.

Examples practiced:

- creating a list of passenger names
- creating a list of ticket numbers

### Important distinction

- `filter` selects some items.
- `map` transforms every item.
- `map` normally returns an array with the same number of positions as the source array.
- The original array is not changed simply because `map` was used.

### Related file

- [`anotherMap.js`](./anotherMap.js)

## Phase 4: `forEach`

We practiced `forEach` by printing a sentence for each passenger.

### Main idea

`forEach` is useful when the purpose is an action or side effect, such as:

- printing
- updating something outside the callback
- performing an operation for each item

It does not build a useful result array and returns `undefined`.

## Phase 5: `find`

We added a `find` example to the array-method practice.

### Main idea

`find` returns the first item that satisfies a condition. It stops searching after the first match.

If no item matches, the result is `undefined`.

### Array-method comparison

| Method | Main purpose | Result |
|---|---|---|
| `filter` | Keep all matching items | New array |
| `map` | Transform every item | New array |
| `forEach` | Perform an action for every item | `undefined` |
| `find` | Get the first matching item | One item or `undefined` |
| `reduce` | Combine items into one result | Number, object, array, or another value |

## Phase 6: `reduce`

We learned `reduce` gradually rather than starting with a large theory explanation.

### First mental model

The accumulator is a running value.

Real-life analogy: a cashier scans products one at a time and keeps one running total. Each new product updates the total, and the final total is the answer.

### Numeric accumulator

The first exercise calculated a total such as the combined passenger ages.

Important points:

- The accumulator stores the result built so far.
- The current item is the item currently being processed.
- The reducer must return the next accumulator value.
- An initial accumulator value should be supplied when appropriate, such as `0` for a numeric total.

### Counting with `reduce`

We practiced counting items that satisfy a condition.

Important debugging points:

- `accumulator++` alone does not return the correct next accumulator value.
- Every branch must return the accumulator.
- The branch that does not match must carry the previous value forward instead of resetting it.
- The condition must match the property and value that the exercise actually asks about.

### Object accumulator

We then moved from a number accumulator to an object accumulator for summaries.

Real-life analogy: a grocery cart summary can track:

- number of fruit items
- total quantity
- total price
- categories

The accumulator object acts like a summary notebook. Each item updates one or more fields in that notebook.

### Flow of a reducer

```text
Start with initial accumulator
          |
Read the current item
          |
Check the condition
          |
Update the accumulator
          |
Return the accumulator
          |
Move to the next item
          |
Final accumulator is the result
```

### Important bug found

In the fruit summary practice, the non-fruit branch accidentally returned `0`. That erased the object accumulated so far. The correct idea is to return the existing accumulator unchanged when the current item does not match.

### Related files

- [`arrayReduce.js`](./arrayReduce.js)
- [`reduceCounter.js`](./reduceCounter.js)
- [`reduceFruits.js`](./reduceFruits.js)
- [`reduceSummary.js`](./reduceSummary.js)

`reduceSummary.js` records an earlier confused attempt involving `reduce` and `forEach`. It is useful as a learning reference for debugging, even though it was not cleaned into a final version.

## Phase 7: Moving toward prototypes

After completing the array-method cluster, we discussed the next important JavaScript topic for Angular and React preparation.

The selected progression is:

```text
Plain objects
    ->
Constructor functions
    ->
Repeated instance data
    ->
Shared methods
    ->
Constructor.prototype
    ->
Instance.__proto__
    ->
Class syntax
```

### Why prototypes matter

Objects created from the same kind of model can share behavior instead of creating a separate copy of every method for every object.

Real-life analogy: a company can give every employee access to one shared company policy handbook. The handbook does not need to be copied into every employee's personal record.

## Prototype setup

A separate folder was created so the prototype concepts would not be mixed with the array-method exercises:

- [`prototype-series/`](./prototype-series/)

The planned files are:

- [`01-plain-objects.js`](./prototype-series/01-plain-objects.js)
- [`02-constructor-functions.js`](./prototype-series/02-constructor-functions.js)
- [`03-prototypes.js`](./prototype-series/03-prototypes.js)
- [`04-prototype-vs-__proto__.js`](./prototype-series/04-prototype-vs-__proto__.js)
- [`05-class-syntax.js`](./prototype-series/05-class-syntax.js)

The files were initially created, then cleared at the request to start from scratch slowly and personally.

## Prototype practice completed so far

### Plain object

The first file began with a simple employee object containing:

- name
- salary
- department

The initial attempt became more complicated by adding methods too early. The exercise was simplified back to direct property access so the basic object structure could be understood first.

### Constructor function

The second exercise introduced an `Employee` constructor function and created two employees:

- John from Engineering
- Jane from Sales

The constructor uses `this` to place each argument on the newly created object.

The user successfully created and logged both employee instances.

### Current stopping point

The next concept is shared behavior:

1. Add a method to employees.
2. Notice what happens when the method is defined inside the constructor.
3. Identify the duplication problem.
4. Move the method to `Employee.prototype`.
5. Call the shared method through each employee instance.
6. Compare `Employee.prototype` with an instance's `__proto__`.
7. Later compare the prototype approach with class syntax.

The learning rule remains: prompts and guidance first, with no complete solution code supplied upfront.

## Mistakes that became useful lessons

- Separate arrays can lose the connection between related data.
- `charAt[0]` is not the same as calling `charAt(0)`.
- A callback must be passed and invoked in the correct place.
- `forEach` does not produce a transformed result array.
- `find` returns only the first matching item.
- A reducer must return the accumulator on every path.
- Returning `0` from an object reducer destroys the accumulated object.
- Adding methods before understanding the plain object can create unnecessary complexity.
- A constructor-created method can be duplicated for every instance; prototypes solve that sharing problem.

## Files touched during the journey

### Array and callback practice

- [`passengerFilter.js`](./passengerFilter.js)
- [`anotherMap.js`](./anotherMap.js)
- [`arrayReduce.js`](./arrayReduce.js)
- [`reduceCounter.js`](./reduceCounter.js)
- [`reduceFruits.js`](./reduceFruits.js)
- [`reduceSummary.js`](./reduceSummary.js)

### Prototype practice

- [`prototype-series/01-plain-objects.js`](./prototype-series/01-plain-objects.js)
- [`prototype-series/02-constructor-functions.js`](./prototype-series/02-constructor-functions.js)
- [`prototype-series/03-prototypes.js`](./prototype-series/03-prototypes.js)
- [`prototype-series/04-prototype-vs-__proto__.js`](./prototype-series/04-prototype-vs-__proto__.js)
- [`prototype-series/05-class-syntax.js`](./prototype-series/05-class-syntax.js)

## Learning checkpoint

Completed:

- Array of objects
- Reusable callbacks
- `filter`
- `map`
- `forEach`
- `find`
- Numeric `reduce`
- Counting with `reduce`
- Object-summary `reduce`
- Plain objects
- Constructor functions

Next:

- Why methods inside constructors can be duplicated
- Shared methods on `prototype`
- The difference between `prototype` and `__proto__`
- How `class` syntax represents the same underlying prototype model

## Code archive

The following sections preserve the code created during the exercises.

### `passengerFilter.js`

```js
const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

function checkPassenger(passengerData){
    return passengerData.age >= 28
}

function automaticPassengerCheck(list, conditionFn){
    const waitingList = [];

    for(const user of list){
        if(conditionFn(user)){
            waitingList.push(user)
        }
    }

    return waitingList;
}

const automateWaitingList = automaticPassengerCheck(passengerList, checkPassenger);
console.log(automateWaitingList);

function checkConditionA(passenger){
    return passenger.ticketNumber.charAt(0) == 'A';
}

const ticketAList = automaticPassengerCheck(passengerList, checkConditionA);
console.log(ticketAList);

function checkConditionJ(passenger){
    return passenger.name.charAt(0) == 'J';
}

const ticketJList = automaticPassengerCheck(passengerList, checkConditionJ);
console.log(ticketJList);

const passengerFilterFeature = passengerList.filter(checkConditionJ);
console.log(passengerFilterFeature);
```

### `anotherMap.js`

```js
const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const passengerNames = passengerList.map((passenger) => passenger.name);
const passengerTicketNumbers = passengerList.map(
    (passenger) => passenger.ticketNumber
);

console.log(passengerNames);
console.log(passengerTicketNumbers);

passengerList.forEach(
    (passenger) => console.log(
        `${passenger.name} is ${passenger.age} years old`
    )
);

const foundPassenger = passengerList.find(
    (passenger) => passenger.age === 30
);

console.log(foundPassenger);
```

### `arrayReduce.js`

```js
const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const totalAge = passengerList.reduce((accumulator, passenger) => {
    return accumulator + passenger.age;
}, 0);

console.log(totalAge);
```

### `reduceCounter.js`

```js
const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const numberOfPassengers = passengerList.reduce((count, passenger) => {
    if(passenger.age >= 28){
        return count + 1;
    } 
    else{
        return count
    }
}, 0);

const ticketOfPassengers = passengerList.reduce((count, passenger) => {
    if(passenger.ticketNumber.charAt(0) == 'A'){
        return count + 1;
    } 
    else{
        return count
    }
}, 0);

console.log(numberOfPassengers);
console.log(ticketOfPassengers);
```

### `reduceFruits.js`

```js
const cart = [
  { item: "apple", price: 2, category: "fruit" },
  { item: "milk", price: 5, category: "dairy" },
  { item: "bread", price: 4, category: "bakery" }
];

const vendorLedger = cart.reduce((acc, cartItem) => {
    return {
        totalItems: acc.totalItems + 1,
        totalPrice: acc.totalPrice + cartItem.price,
        fruitItems: cartItem.category === "fruit"
            ? acc.fruitItems + 1
            : acc.fruitItems
    };
}, {
    totalItems: 0,
    totalPrice: 0,
    fruitItems: 0
});

console.log(vendorLedger);
```

### `reduceSummary.js` - earlier practice attempt

```js
const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const initialObj = {
    total: 0,
    elligible: 0,
    ticketA: 0
};

const summary = passengerList.reduce(({}, passenger) => {
    passenger.forEach((member) => {
        summary.total += 1;

        if(member.age >= 28) {
            summary.elligible += 1;
        }

        if(member.ticketNumber.charAt(0) == 'A') {
            summary.ticketA += 1;
        }
    });

    return summary;
}, initialObj);

console.log(summary);
```

This attempt was intentionally kept as a record of the point where the object accumulator was still confusing. The main issue was treating each passenger as if it were another array and combining `reduce` with an unnecessary nested `forEach`.

### `prototype-series/01-plain-objects.js`

```js
const employee = {
    name: "John",
    salary: 50000,
    department: "Engineering"
};

console.log(employee.name);
console.log(employee.salary);
```

### `prototype-series/02-constructor-functions.js`

```js
const Employee = function(name, salary, department){
    this.name = name;
    this.salary = salary;
    this.department = department;

    function work(){
        console.log(`${this.name} is working in ${this.department} department.`);
    }
}

const emp1 = new Employee("John", 50000, "Engineering");
const emp2 = new Employee("Jane", 60000, "Sales");

console.log(emp1);
console.log(emp2);
```

### Prototype files reserved for upcoming practice

The following files were created and cleared so the concepts can be built from scratch with mentor prompts:

- `prototype-series/03-prototypes.js`
- `prototype-series/04-prototype-vs-__proto__.js`
- `prototype-series/05-class-syntax.js`
