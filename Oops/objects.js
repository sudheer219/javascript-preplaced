const myLaptop = {
    brand: "HP", // property
    ram: "12GB", // property
    turnOn:function(){ // method
        console.log('Laptop is booting up...');     
    }
}


const mySong = {
  title: "Our God is Awesome", // Fill in any song title
  language: "English", // Fill in the language (e.g., "Telugu", "English")
  play: function() {
    console.log("Playing the song now...");
  }
};

// Write the code to log the title here:
console.log(mySong.title); 

// Write the code to trigger the action here:
mySong.play(); 

class SongBluePrint {
    constructor(title, language){
        this.title = title;
        this.language = language
    }

    play(){
        console.log(`Playing the song ${this.title} now...`)
    }

    showLang(){
        console.log(`The song is in ${this.language}`);
    }
}

const song1 = new SongBluePrint("Our God is Awesome", "English");
const song2 = new SongBluePrint("Awaken", "Spanish");

console.log(song2.title);
song2.play();
