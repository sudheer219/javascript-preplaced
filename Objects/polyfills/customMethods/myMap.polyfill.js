const arr = [2, 5, 6, 12];

Array.prototype.myMap = function(callBack){
    let result = [];

    for(let i=0; i<this.length; i++){
        const modifiedValues = callBack(this[i]);
        result.push(modifiedValues);
    }

    return result;
}

const newArr = arr.myMap((num)=>
num*2 );
console.log(newArr);