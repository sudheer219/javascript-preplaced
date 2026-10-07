Array.prototype.myReduce = function(callback, initialValue) {

    let accumulator = initialValue;
    

    for(let i=0; i<this.length; i++){
        accumulator = callback(accumulator, this[i])
    }

    return accumulator;
}