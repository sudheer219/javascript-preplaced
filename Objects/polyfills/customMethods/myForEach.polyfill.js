Array.prototype.myForEach = function(callback) {
  // 1. Loop forward through the array starting from 0 to the end
  for (let i = 0; i < this.length; i++) {
    // 2. Call the callback function for the current item!
    callback(this[i], i);

    // Inside the callback, pass: the item (this[i]) and its index (i)
    
  }
  
  // No return statement needed! It naturally returns undefined.
};
