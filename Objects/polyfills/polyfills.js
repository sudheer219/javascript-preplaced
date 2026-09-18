const numbersArr = [2, 4, 4,3];

// we want to convert all items to square of  items of array eg: 2*2, 5*5
// const squared = numbersArr.map((num) => num * num);
// console.log(squared);

Array.prototype.myMap = function(callback) {

      const result = [];
      for(let i=0; i < this.length; i++){
        const sqrNum = callback(this[i], i, this);
        result.push(sqrNum)
      }

      return result;
};



numbersArr.myMap((num, index)=> {
    console.log(`The square of ${num} at position ${index+1} of given array is ${num * num}`)
});