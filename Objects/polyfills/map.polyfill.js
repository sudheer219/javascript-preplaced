numArr = [2, 4, 6];

if (!Array.prototype.myArr){
    Array.prototype.myArr = function (callBack){
        if(typeof callBack !== 'function'){
            throw new TypeError('callback must be a function');
        }
        
        const result = [];

        for(let i=0; i < this.length; i++){
           const sqrNum = callBack(this[i], i, this);
           result.push(sqrNum);
        };
        return result;

    };
}


numArr.myArr((num) => console.log(num*num));