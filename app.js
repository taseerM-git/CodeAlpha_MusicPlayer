const songs = [
    {
        title: "Tum hi ho",
        artist: "Rahulsapkal",
        audio: "music/rahulsapkal-tum-hi-ho-emotional-sad-romantic-bollywood-ballad-562153.mp3",
        image: "musicimages/tum-hi-ho-images.jfif"
    },
    {
        title: "Khawab ka musafir",
        artist: "Unknown Singer",
        audio: "music/musiclaundry-khwaab-ka-musafir-romantic-hindi-song-ai-music-original-lyrics-477286 (1).mp3",
        image: "musicimages/khuwab-images.jfif"
    },
    {
        title: "Doremon Song",
        artist: "Ramp",
        audio: "music/dkfilms-doraemon-hindi-rampb-pop-song-383334.mp3",
        image: "musicImages/Doremon-images.jfif"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let songIndex = 0;


function loadSong(){

    let song = songs[songIndex];
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.image;
    audio.src = song.audio;
    createPlaylist();
}

function playSong(){
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong(){

    audio.pause();
    playBtn.innerHTML =
    '<i class="fas fa-play"></i>';

}

playBtn.addEventListener("click",()=>{

    if(audio.paused){
        playSong();
    }
    else{
        pauseSong();
    }
});

nextBtn.addEventListener("click",()=>{

    songIndex++;
    if(songIndex >= songs.length){
        songIndex = 0;
    }
    loadSong();
    playSong();
});

prevBtn.addEventListener("click",()=>{

    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong();
    playSong();

});

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        let progressPercent =
        (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.innerText =
        formatTime(audio.currentTime);

        duration.innerText =
        formatTime(audio.duration);

    }
});

progress.addEventListener("input",()=>{
    audio.currentTime =
    (progress.value / 100) * audio.duration;
});


volume.addEventListener("input",()=>{
    audio.volume = volume.value;
});

function formatTime(time){
    if(isNaN(time)){
        return "0:00";
    }

    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if(sec < 10){
        sec = "0" + sec;
    }
    return `${min}:${sec}`;
}

function createPlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        let li = document.createElement("li");

        li.innerText =
        `${song.title} - ${song.artist}`;

        if(index === songIndex){
            li.classList.add("active");
        }

        li.addEventListener("click",()=>{

            songIndex=index;
            loadSong();
            playSong();
        });
        playlist.appendChild(li);
    });
}

audio.addEventListener("ended",()=>{
    nextBtn.click();
});
loadSong();