async function greet(){
    return "hello";
}

console.log("Start");

const result = greet();

console.log(result);

console.log("End");

/* 
Here Start is printed first 
    then as result is executed it returns a promise immdediately and prints Hello and followed by End.

*/
