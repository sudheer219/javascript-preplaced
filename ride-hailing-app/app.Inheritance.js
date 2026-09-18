class Driver{
    constructor(driverName) {
        this.driverName = driverName;
    }

    getDetails() {
        return `Driver driverName: ${this.driverName}`;
    }
}

class CaptainRider extends Driver {
    constructor(driverName, helmetProvided) {
        super(driverName);
        this.helmetProvided = helmetProvided;
    }

    getDetails() {
        return `${super.getDetails()}, helmetProvided: ${this.helmetProvided}`;
    }
}

const bike = new Driver("John");
const captain = new CaptainRider("Mike", true);

console.log(bike.getDetails());
console.log(captain.getDetails());