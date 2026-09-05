const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];

const initialObj = {
    total:0,
    elligible: 0,
    ticketA: 0
}
const summary = passengerList.reduce(({}, passenger) => {
    passenger.forEach((member) => {
        summary.total +=1;   
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