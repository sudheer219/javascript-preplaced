Array.prototype.myShift = function(){
// 1. Check if the line is empty. If it is, return undefined.
if(this.length == 0){
    return undefined;
}
  
  // 2. Save the person at the very front (Index 0) in a variable so you can return them later.
  let firstPerson = this[0];
  
  // 3. The Loop: Start at index 1 and move everyone 1 step forward (into index i - 1).
  for(let i=1; i<this.length; i++){
    this[i - 1] = this[i];
  }
  
  // 4. Shrink the total length of the line by 1.
  this.length = this.length - 1
  
  // 5. Return the person who left the line.
  return firstPerson;
}