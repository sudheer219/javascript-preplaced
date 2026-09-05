const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const passengerDisplay = passengerList.map((passenger) => {
    return {
        name: passenger.name,
        ticketNumber: passenger.ticketNumber
    }
})

console.log(passengerDisplay);


