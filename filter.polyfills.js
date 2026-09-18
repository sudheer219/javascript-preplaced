// filter


const masterArr = [32, 12,30, 44, 55];
const filteredArr = masterArr.filter((num) => num > 30);
//console.log(filteredArr);

 if (!Array.prototype.myFilter){
    Array.prototype.myFilter = function (callBack){
        result = [];
        for(let i =0; i < this.length; i++){
            const filterItems = callBack(this[i]);
            if(filterItems){
                result.push(this[i]);

            }
        }

        return result;
    }
};

const finalArr = masterArr.myFilter(num => {if( num > 30){return true}});
console.log(finalArr);