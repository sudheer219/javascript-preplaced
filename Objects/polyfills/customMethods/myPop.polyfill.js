
Array.prototype.myPop = function() {
  // 1. Check if the tube is empty (if length is 0)
  if(this.length == 0){
    return undefined
  }

  // 2. Grab the top chip using the length trick
  let topChip = this[this.length - 1];
  
  // 3. Shrink the length of the tube by 1
  this.length = this.length - 1;
  
  // 4. Return the chip you grabbed
  return topChip;
};