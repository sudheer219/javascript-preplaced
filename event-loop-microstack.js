console.log("A");

Promise.resolve().then(() => {
    console.log("B");

    Promise.resolve().then(() => {
        console.log("C");
    });

    setTimeout(() => {
        console.log("D");
    }, 0);
});

setTimeout(() => {
    console.log("E");
}, 0);

console.log("F");