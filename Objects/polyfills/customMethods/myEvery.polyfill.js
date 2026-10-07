const arr = [2, 3, 6 ,8 ,12];

Array.prototype.myEvery = function(callback){
    for(let i=0; i<this.length; i++){
        if(i in this){
            if(!callback(this[i], i, this)){
                return false
            }
        }        
    }
    return true;
}

const positionArr = arr.myEvery((num)=>num > 2);
console.log(positionArr);