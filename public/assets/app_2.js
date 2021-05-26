class Config {
  static range1() {
    return document.getElementById("seekbar1");
  }
  static intervalfunc;
}

const seek = () => {
  let audio = document.getElementById("audio");
  let time = Config.range1().value;
  audio.currentTime = (time / 100) * audio.seekable.end(0);
};
const pause = () => {
  let audio = document.getElementById("audio");
  let playPauseButton = document.getElementById("playPauseButton");
  let playPauseButton1 = document.getElementById("playPauseButton1");
  if (!audio.paused) {
    audio.pause();
    console.log("paused");

    clearInterval(Config.intervalfunc);
    playPauseButton.className = "fas fa-play";
    playPauseButton1.className = "fas fa-play";
  }
};
const play = () => {
  let audio = document.getElementById("audio");
  let playPauseButton = document.getElementById("playPauseButton");
  let playPauseButton1 = document.getElementById("playPauseButton1");
  if (audio.paused) {
    audio.play();
    console.log("played");
    Config.intervalfunc = setInterval(setProgressValue, 1000);
    playPauseButton.className = "fas fa-pause";
    playPauseButton1.className = "fas fa-pause";
  }
};
const playPause = () => {
  let audio = document.getElementById("audio");
  let playPauseButton = document.getElementById("playPauseButton");
  let playPauseButton1 = document.getElementById("playPauseButton1");

  if (audio.paused) {
    audio.play();
    console.log("played");
    Config.intervalfunc = setInterval(setProgressValue, 1000);
    playPauseButton.className = "fas fa-pause";
    playPauseButton1.className = "fas fa-pause";
  } else {
    audio.pause();
    console.log("paused");

    clearInterval(Config.intervalfunc);
    playPauseButton.className = "fas fa-play";
    playPauseButton1.className = "fas fa-play";
  }
};
const nextSong = () => {
  let i = parseInt(
    document.getElementById("forward-button").getAttribute("data-songnumber")
  );
  let song = document.getElementById("formsong" + (i + 1)).value;
  let artist = document.getElementById("formsongartist" + (i + 1)).value;
  let songname = document.getElementById("formsongname" + (i + 1)).value;
  let formlaptop = document.getElementById("formlaptopimg" + (i + 1)).value;
  let formMobile = document.getElementById("formmobileimg" + (i + 1)).value;
  let formList = document.getElementById("formlistimg" + (i + 1)).value;
  // let audio = document.getElementById("audio");
  // let audsrc= document.getElementsByTagName('source');
  openSong(song, formlaptop, formMobile, formList, i + 1, songname, artist);
};

const prevSong = () => {
  let i = parseInt(
    document.getElementById("forward-button").getAttribute("data-songnumber")
  );
  let song = document.getElementById("formsong" + (i - 1)).value;
  let artist = document.getElementById("formsongartist" + (i - 1)).value;
  let songname = document.getElementById("formsongname" + (i - 1)).value;
  let formlaptop = document.getElementById("formlaptopimg" + (i - 1)).value;
  let formMobile = document.getElementById("formmobileimg" + (i - 1)).value;
  let formList = document.getElementById("formlistimg" + (i - 1)).value;
  // let audio = document.getElementById("audio");
  // let audsrc= document.getElementsByTagName('source');
  openSong(song, formlaptop, formMobile, formList, i - 1, songname, artist);
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
  songNextAfterFinish(Config.range1);
  let duration = document.getElementById("song-duration");
  duration.innerText = `${parseInt(audio.seekable.end(0) / 60)}:${parseInt(
    audio.seekable.end(0) - 60 * parseInt(audio.seekable.end(0) / 60)
  ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`;
};

const songNextAfterFinish = () => {
  let time = Config.range1().value;
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

const openPlayer = (
  songSrc,
  laptop_coverSrc,
  mobile_coverSrc,
  list_coverSrc,
  i,
  songName,
  songArtistName
) => {
  let player = document.getElementById("bottom-player");
  player.style.transform = "translateY(0)";
  let songScreen = document.getElementById("songScreen");
  songScreen.style.top = "0%";
  document.body.style.overflowY = "hidden";
  openSong(
    songSrc,
    laptop_coverSrc,
    mobile_coverSrc,
    list_coverSrc,
    i,
    songName,
    songArtistName
  );
};

const opensongScreen = () => {
  let songScreen = document.getElementById("songScreen");
  songScreen.style.top = "0%";
  let player = document.getElementById("bottom-player");
  player.style.transform = "translateY(0%)";
  document.body.style.overflowY = "hidden";
};
const minimizeSongscreen = () => {
  let player = document.getElementById("bottom-player");
  player.style.transform = "translateY(-100%)";
  let songScreen = document.getElementById("songScreen");
  songScreen.style.top = "100%";
  document.body.style.overflowY = "visible";
};
const closePlayer = () => {
  let player = document.getElementById("bottom-player");
  player.style.transform = "translateY(0)";
  document.body.style.overflowY = "visible";
  pause();
};
const openSong = (
  songSrc,
  laptop_coverSrc,
  mobile_coverSrc,
  list_coverSrc,
  i,
  songName,
  songArtistName
) => {
  let audsrc = document.getElementsByClassName("audiosrc");
  let audio = document.getElementById("audio");
  document.getElementById("forward-button").setAttribute("data-songnumber", i);
  let playerimgsrc = document.getElementsByClassName("playerimgsrc");
  let playerimg = document.getElementById("playerimg");
  playerimgsrc[1].srcset = laptop_coverSrc;
  playerimgsrc[0].srcset = mobile_coverSrc;
  playerimg.src = list_coverSrc;
  audsrc[0].src = songSrc;
  audio.load();
  play();
  let songTitle = document.getElementById("songTitle");
  songTitle.innerText = songName;
  let songTitle2 = document.getElementById("songTitle2");
  songTitle2.innerText = songName;
  let songArtist = document.getElementById("songArtist");
  songArtist.innerText = songArtistName;
  let playerimg1 = document.getElementById("playerimg1");
  playerimg1.src = list_coverSrc;
};
const searchSetLaptopMain = () => {
  let laptopMainSearch = document.getElementById("laptopMainSearch");

  let searchbuttons = document.getElementsByClassName("search-anchor");

  searchbuttons[1].href = "#" + titleCase(laptopMainSearch.value);
};
const searchSetMobileMain = () => {
  let mobileMainSearch = document.getElementById("mobileMainSearch");
  let searchbuttons = document.getElementsByClassName("search-anchor");
  searchbuttons[0].href = "#" + titleCase(mobileMainSearch.value);
};
const searchSetLaptopPlayer = () => {
  let laptopPlayerSearch = document.getElementById("laptopPlayerSearch");
  let searchbuttons = document.getElementsByClassName("search-anchor");
  searchbuttons[3].href = "#" + titleCase(laptopPlayerSearch.value);
};
const searchSetMobilePlayer = () => {
  let mobilePlayerSearch = document.getElementById("mobilePlayerSearch");
  let searchbuttons = document.getElementsByClassName("search-anchor");
  searchbuttons[2].href = "#" + titleCase(mobilePlayerSearch.value);
};
// const searchSetMainFunc = () => {
//   let mobileMainSearch = document.getElementById("mobileMainSearch");
//   let laptopMainSearch = document.getElementById("laptopMainSearch");

//   let searchbuttons = document.getElementsByClassName("search-anchor");
//   searchbuttons[0].href = "#" + titleCase(mobileMainSearch.value);
//   searchbuttons[1].href = "#" + titleCase(laptopMainSearch.value);
// };

// const searchSetPlayerFunc = () => {
//   let mobilePlayerSearch = document.getElementById("mobilePlayerSearch");
//   let laptopPlayerSearch = document.getElementById("laptopPlayerSearch");

//   let searchbuttons = document.getElementsByClassName("search-anchor");
//   searchbuttons[2].href = "#" + titleCase(mobilePlayerSearch.value);
//   searchbuttons[3].href = "#" + titleCase(laptopPlayerSearch.value);
// };
const disablePlaylistButton = (i) => {
  let button = document.getElementById("button" + i);
  button.disabled = true;
  let itag = document.getElementById("buttonicon" + i);
  itag.className("fas fa-check fa-2x");
};
function titleCase(string) {
  let sentence = string.toLowerCase().split(" ");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(" ");
}
// function titleCase(string) {
//   var sentence = string.toLowerCase().split(" ");
//   for (var i = 0; i < sentence.length; i++) {
//     sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
//   }
//   document.write(sentence.join(" "));
//   return sentence;
// }
// const searchedDivColor=(searchBar)=>{
//   removeColor();

//   let coloredDiv=document.getElementById(searchBar.value)
//   coloredDiv.style.backgroundColor="rgba(255, 255, 255, 0.2)"
//   return coloredDiv;

// }

const searchLaptopPlayer = () => {
  minimizeSongscreen();
  // searchedDivColor(laptopPlayerSearch=document.getElementById('laptopPlayerSearch'));
};
const searchMobilePlayer = () => {
  minimizeSongscreen();
  // searchedDivColor(mobilePlayerSearch=document.getElementById('mobilePlayerSearch'));
};
// const removeColor=()=>{
//   searchedDivColor.style.backgroundColor="rgba(133, 133, 133, 0.274)"
// }
// add the search style 2 and also add css for 1

//replace this serially (search components by searching for class names):
// <button type="submit" name="search" class="search-bar-button">
//   <a class="search-anchor" href="#" onclick="searchMobileMain()"
//     ><i class="fas fa-search search-icon"></i
//   ></a>
// </button>

// <button type="submit" name="search" class="search-bar-button">
//   <a class="search-anchor" href="#" onclick="searchLaptopMain()"
//     ><i class="fas fa-search search-icon"></i
//   ></a>
// </button>

// <button type="submit" name="search" class="search-bar-button"> (The player search bar for Mobile doesnt have button paste this there)
//   <a class="search-anchor" href="#" onclick="searchMobilePlayer()"
//     ><i class="fas fa-search search-icon"></i
//   ></a>
// </button>

// <button type="submit" name="search" class="search-bar-button">
//   <a class="search-anchor" href="#" onclick="searchLaptopPlayer()"
//     ><i class="fas fa-search search-icon"></i
//   ></a>
// </button>

//     <input
//     type="text"
//     name="search"
//     placeholder="search"
//     class="dropdown-search-bar"
//     id="mobileMainSearch"
//     onkeyup="searchSetMainFunc()"
//   />

//     <input type="text" name="search" placeholder="Search" class="search" id="laptopMainSearch" onkeyup="searchSetMainFunc()" />

//     <input
//       type="text"
//       name="search"
//       placeholder="search"
//       class="dropdown-search-bar"
//       id="mobilePlayerSearch"
//       onkeyup="searchSetPlayerFunc()"
//     />

//     <input
//   type="text"
//   name="search"
//   placeholder="Search"
//   class="search"
//   id="laptopPlayerSearch"
//   onkeyup="searchSetPlayerFunc()"
// />
