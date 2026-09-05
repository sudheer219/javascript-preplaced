const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];


const passengerNames = passengerList.map((passenger) => passenger.name);
const passengerTicketNumbers = passengerList.map((passenger) => passenger.ticketNumber);
console.log(passengerNames);
console.log(passengerTicketNumbers);

passengerList.forEach(
    (passenger) => console.log(
        `${passenger.name} is ${passenger.age} years old`
    ));

const foundPassenger = passengerList.find((passenger) => passenger.age === 30);

console.log(foundPassenger);
