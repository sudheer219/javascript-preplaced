class Smartphone {
    constructor(modelName, batteryLife){
        this.modelName = modelName;
        this.batteryLife = batteryLife;
    }

    unlockPhone(){
        console.log(`${this.modelName} is unlocked!`);
    }
}

const myPhone = new Smartphone("iPhone 17", "95%");

console.log(myPhone);

myPhone.unlockPhone();