class AudioPlayer{
    constructor(songTitle){
        this.songTitle = songTitle;
    }

    #connectToServer(){
        console.log('Connect to server');
    }
    #authoriseUser(){
        console.log("Fetched user detils, autheticated");
    }

    #fetchAudioFile(){
        console.log("pick audio file from db");
    }

    play(){
        this.#connectToServer();
        this.#authoriseUser();
        this.#fetchAudioFile();
    }
}

const player = new AudioPlayer('Hallelujah!!');
player.play();


class AudioMedia {
    #songLang; // Declaring a private property
    constructor(title, songLang){
        this.title = title;
        this.#songLang = songLang;
    }

    showDetails(){
        console.log(`Play ${this.title} in ${this.#songLang}`);
    }
}

class Song extends AudioMedia{

}

class Podcast extends AudioMedia {
    constructor(title, songLang, hostName){
        super(title, songLang);
        this.hostName = hostName;
    }

    showDetails(){
        console.log(`Streaming Podcast ${this.title} in ${this.songLang}`);
    }

    showHost(){
        console.log(`Podcast hosted by ${this.hostName}`);
    }
    
}

const mySong = new Song('Praise', 'English');
const myPodcast = new Podcast('Praise Podcast', 'Spanish', 'Pastor Rick Steven');

mySong.showDetails();
myPodcast.showDetails();
myPodcast.showHost();

