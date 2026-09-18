class TapToPaySystem{
    makePayment(amount){
        this.#connectToBankServer();
        this.#EncriptData();
        this.#transferFunds(amount);
        console.log(`💸 ${amount} is transfer successfully!`)
    }

    #connectToBankServer(){};
    #EncriptData(){};
    #transferFunds(amount){};
}

const paySystem = new TapToPaySystem();
paySystem.makePayment(50000);