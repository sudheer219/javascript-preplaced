const passengerList = [
    { name: "John Doe", age: 30, ticketNumber: "A123" },
    { name: "Jane Smith", age: 25, ticketNumber: "B456" },
    { name: "Alice Johnson", age: 28, ticketNumber: "C789" }
];


/* function checkPassenger(passengerData){
    return passengerData.age >= 28
}

const waitingList = [];

for(const passenger of passengerList){
    if(checkPassenger(passenger)){
        waitingList.push(passenger)
    }
}

console.log("waitingList: ", waitingList); */

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