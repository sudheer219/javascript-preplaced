class SecureBank{
    #balance; // # makes the property private, secured from direct access outside the class

    constructor(initialAmount){
        this.#balance = initialAmount;
    }

    getBalance(){
        return `Your balance is $${this.#balance}`;
    }

    deposit(amount){    
        if(amount > 0){            
            this.#balance = this.#balance + amount;
            console.log(`Deposited $${amount}. New balance is $${this.#balance}`);
        } else {
            console.log("Invalid deposit amount");
        }
    }
}

let myAccount = new SecureBank(500);
// myAccount.#balance = 1000; // This will cause an error because #balance is private and cannot be accessed directly outside the class
console.log(myAccount.getBalance()); // Accessing the balance through the public method
myAccount.deposit(200); // Depositing money through the public method
console.log(myAccount.getBalance()); // Checking the balance again after deposit    
