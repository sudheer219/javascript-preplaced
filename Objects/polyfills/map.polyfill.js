numArr = [2, , 4, 6];

if (!Array.prototype.myMap){
    Array.prototype.myMap = function (callBack){
        
        //1. callback must be a function
        if(typeof callBack !== 'function'){ 
            throw new TypeError('callback must be a function');
        }
        
        // 2. Result preserves the source array's length
        const result = new Array(this.length);

        for(let i=0; i < this.length; i++){ 
            
            // 3. Skip missing indexes in sparse arrays
            if(i in this){  
                result[i] = callBack(this[i], i, this);
            }
           
        };
        return result;

    };
};


const result = numArr.myMap(value => value * 2);
console.log(result);

