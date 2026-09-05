const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const totalAge = passengerList.reduce((accumulator, passenger) => {
    return accumulator + passenger.age;
}, 0);

console.log(totalAge);