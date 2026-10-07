const arr = [12, 34, 56, 84];

Array.prototype.myFilter = function(calBack){
    const result = [];

    for(let i=0; i < this.length; i++){
        const filterItem = calBack(this[i]);
        if(filterItem){
            result.push(this[i]);
        }
    }
    return result;
}

const newArr = arr.myFilter((num)=> num > 40);
console.log(newArr);
