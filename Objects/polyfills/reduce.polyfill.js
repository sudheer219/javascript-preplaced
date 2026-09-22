numArr = [24, 25 , 66, 15];

if(!Array.prototype.myReduce){
    Array.prototype.myReduce = function (callBack, initialValue){

        // 1. Validate callback
        if(typeof callBack !== 'function'){
            throw new TypeError('callBack must be a function');
        }

        let accumulator;
        let startIndex;

        // 2. Check whether initialValue was provided
        if(arguments.length >= 2){
            accumulator = initialValue;
            startIndex = 0;
        } else {
            // 3. Empty array + no initial value
            if(this.length === 0){
                throw new TypeError("REduce of empty error with no initial value");
            }

            accumulator = this[0];
            initialValue = 1;
        }

        // 4. Perform reduction
        for(let i= startIndex; i < this.length; i++){
            accumulator = callBack(
                accumulator,
                this[i],
                i,
                this
            )
        }

        // 5. Return final accumulated value
        return accumulator;

    }
}


