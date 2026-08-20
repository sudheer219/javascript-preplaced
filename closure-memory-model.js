function outer() {
    let count = 0;

    return function() {
        count++;
        console.log(count);
    };
}

const counter = outer();
counter();
counter();