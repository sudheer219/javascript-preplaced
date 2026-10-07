let arr = [2, 4, 6, 8];

Array.prototype.mySome = function (callback) {
    for(let i=0; i < this.length; i++){
        if(i in this){
            if(callback(this[i], this, i)){
                return true
            }
        }
    }
    return false;
}

let someArr = arr.mySome((num)=>num > 5);
console.log(someArr);