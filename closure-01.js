function outer(){
    let message = "Hello JS";
    
    function inner(){
        console.log(message);
    }
    return inner;
}

const callInner = outer();
callInner(); // logs "Hello JS"