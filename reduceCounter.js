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