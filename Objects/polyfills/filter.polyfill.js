numArr = [24, undefined , 66, 15];

if(!Array.prototype.myFilter){
    Array.prototype.myFilter = function (callBack){
        if(typeof callBack !== "function"){
            throw new TypeError("CallBack must be function");
        }
        const result =[];

        for(let i=0; i < this.length; i++){
            if (!(i in this)) continue;

            const shouldKeep = callBack(this[i], i, this);
            if(shouldKeep){
                result.push(this[i]);
            }
        };

        return result;
    };
}


const filteredArr = numArr.myFilter(num => num < 30);
    
console.log(filteredArr);