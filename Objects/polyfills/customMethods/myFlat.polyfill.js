const arr = [1, [2, 3], 4];

Array.prototype.myFlat = function() {
    const tray = [];

    for(let i=0; i< this.length; i++){
        const currentItem = this[i];
        if(currentItem instanceof Array){
            for(let j=0; j< currentItem.length; j++){
                tray.push(currentItem[j]);
            }
        }
        else{
            tray.push(currentItem);
        }
    }
    return tray;

};
