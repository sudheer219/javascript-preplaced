Array.prototype.myUnShift = function(newItem){

    
  
  for(let i=this.length - 1; i>= 0; i--){
    this[i + 1] = this[i];
  }
  
  this[0] = newItem;


  return this.length = this.length + 1
 

  
}