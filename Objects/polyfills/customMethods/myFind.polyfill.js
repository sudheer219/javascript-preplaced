const arr = [2, 4, 8, 10];

Array.prototype.myFind = function(callback) {
    
    for(let i=0; i<this.length; i++){
        if(callback(this[i], this, i)){
            return this[i]; // return actual element
        }
    }

    return undefined; // if loop finishes with no match.
}

const foundItem=arr.myFind((num) => num == 4);

console.log(foundItem);