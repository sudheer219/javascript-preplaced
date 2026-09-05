const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];


function transformFn(data){
    
    return {
        age: data.age,
        ticketNumber: data.ticketNumber
    }
}

function passengerDisplay(list, transformFn){
    const result = [];

    for(const passenger of list){
        const transormedData = transformFn(passenger);
        result.push(transormedData)
    }

    return result;
}

const myData = passengerDisplay(passengerList, transformFn);
console.log(myData);


