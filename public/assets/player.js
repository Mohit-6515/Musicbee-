let range1 = document.getElementById("seekbar1");
let intervalfunc;

const seek = (range) => {
  let audio = document.getElementById("audio");
  let time = range.value;
  audio.currentTime = (time / 100) * audio.seekable.end(0);
};

const playPause = () => {
  let audio = document.getElementById("audio");
  let playPauseButton = document.getElementById("playPauseButton");
  let playPauseButton1 = document.getElementById("playPauseButton1");

  if (audio.paused) {
    audio.play();
    console.log("played");
    intervalfunc = setInterval(setProgressValue, 1000);
    playPauseButton.className = "fas fa-pause";
    playPauseButton1.className = "fas fa-pause";
  } else {
    audio.pause();
    console.log("paused");

    clearInterval(intervalfunc);
    playPauseButton.className = "fas fa-play";
    playPauseButton1.className = "fas fa-play";
  }
};
const nextSong = () => {
  let audio = document.getElementById("audio");
  let audsrc = document.getElementsByTagName("source");
  
  audsrc[0].src = "./K+NAAN+Wavin+Flag+Coca+Cola+Celebration+Mix.ogg";
  audio.load();
  audio.play();
};
const setProgressValue = () => {
  let audio = document.getElementById("audio");
  document.getElementById("seekbar1").value =
    (audio.currentTime * 100) / audio.seekable.end(0);
  let audioDuration = `${parseInt(audio.currentTime / 60)}:${parseInt(
    audio.currentTime - 60 * parseInt(audio.currentTime / 60)
  ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`;
  console.log(audioDuration);
  document.getElementsByClassName("moving-time")[0].innerText = audioDuration;
  songNextAfterFinish(range1);
};

const songNextAfterFinish = (range) => {
  let time = range.value;
  if (time === "100") {
    nextSong();
  }
};
const volumeControls1 = () => {
  let audio = document.getElementById("audio");
  let volumebar1 = document.getElementById("volumebar1");
  let volumebar2 = document.getElementById("volumebar2");
  audio.volume = volumebar1.value / 100;
  volumebar2.value = audio.volume * 100;
};

const volumeControls2 = () => {
  let audio = document.getElementById("audio");
  let volumebar1 = document.getElementById("volumebar1");
  let volumebar2 = document.getElementById("volumebar2");
  audio.volume = volumebar2.value / 100;
  volumebar1.value = audio.volume * 100;
};
