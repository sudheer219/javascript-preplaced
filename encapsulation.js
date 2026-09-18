class SecurePhone{
    #battery = 50

    getBatteryStatus(){
        console.log(`Phone battery is ${this.#battery}%`)
    }

    pluginBattery(){
        if(this.#battery < 60){
            this.#battery +=10;
            console.log("🔋 Phone is charging");
        }
    }
}

const myPhone = new SecurePhone();
myPhone.getBatteryStatus();
myPhone.pluginBattery();