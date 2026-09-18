class Vehicle {
  constructor(baseFare) {
    this.baseFare = baseFare;
  }
  calculateFare() {
    return this.baseFare; // Default behavior
  }
}

class PremiumCab extends Vehicle {
  // Method Overriding: Replacing the parent's logic with specialized logic
  calculateFare() {
    return this.baseFare * 1.5; 
  }
}

class CaptainBike extends Vehicle {
  calculateFare() {
    return this.baseFare * 1.2;
  }
}


const fleet = [
  new Vehicle(100),
  new PremiumCab(100),
  new CaptainBike(100)
];

function processFares(vehicles) {
  // TODO: Loop through the vehicles array and console.log each vehicle's calculateFare() result
  for (const vehicle of vehicles) {
    console.log(vehicle.calculateFare());
  }
}

processFares(fleet);
