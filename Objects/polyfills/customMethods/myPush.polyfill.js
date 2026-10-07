Array.prototype.myPush = function(newItem) {
  // 1. Put the newItem into the empty slot at the end of the tube
  this[this.length] = newItem
  
  // 2. Return the new total length of the tube
  return this.length
};