arr = [24, 25, 30];

/* const result = arr.push(20);
console.log(arr);
console.log(result);

output
    [24, 25, 20]
    3 */

if(!Array.prototype.myPush){
    Array.prototype.myPush = function() {
        // logic
        const arrLength = this.length;
            for(let i = 0; i < arguments.length; i++){
                this[arrLength + i]=arguments[i];
            }

        return this.length;
    }
}



arr.myPush(30, 40,);
console.log(arr);
console.log(arr.length);



