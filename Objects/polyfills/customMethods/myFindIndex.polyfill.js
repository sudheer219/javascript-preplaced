const arr = [2, 3, 6 ,8 ,12];

Array.prototype.myFindIndex = function(callback){
    for(let i=0; i<this.length; i++){
        if(callback(this[i], i, this)){
            return i
        }
    }

    return -1;
}

const positionArr = arr.myFindIndex((num)=>num==112);
console.log(positionArr);