// map 

masterArr = [4,6,8];

if(!Array.prototype.myMap){
    Array.prototype.myMap = function (callBack){
        result = [];

        for(let i = 0; i < this.length; i++){
            mappedItems = callBack(this[i]);
            result.push(mappedItems)
        }
        return console.table(result);
    }
}

masterArr.myMap((num) => num * num);