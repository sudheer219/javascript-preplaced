function Driver(name, vehicleType) {
    console.log("Inside constructor, 'this' is:", this);
    this.name = name;
    this.vehicleType = vehicleType;
  }
  
  // 1. Run this and observe the console log:
  const testDriver = new Driver("Suresh", "Auto");
  