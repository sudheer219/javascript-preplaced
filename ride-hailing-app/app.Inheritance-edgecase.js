// The Parent Class
class Vehicle {
  constructor(driverName) {
    this.driverName = driverName;
  }
  
  getDetails() {
    return `Driver: ${this.driverName}`;
  }
}

class PremiumCab extends Vehicle {
  constructor(driverName, dynamicCcTv) {
    this.dynamicCcTv = dynamicCcTv; // ❌ Modifying 'this' BEFORE super()
    super(driverName);
  }
}

const testCab = new PremiumCab("Suresh", true);
