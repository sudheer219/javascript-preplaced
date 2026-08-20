function outer() {
  let city = "Hyderabad";

  function inner() {
    debugger;
    console.log(city);
  }

  return inner;
}

const fn = outer();


fn();
