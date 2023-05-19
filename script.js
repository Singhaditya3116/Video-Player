const player = document.querySelector(".player");
const videoEl = document.querySelector("video");
const playBtn = document.getElementById("play-btn");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const volumeBtn = document.getElementById("volume-icon");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const timeDuration = document.querySelector(".time-duration");
const timeElapsed = document.querySelector(".time-elapsed");
const playerSpeed = document.querySelector(".player-speed");
const fullscreen = document.getElementById("fullscreen");

// Play & Pause ----------------------------------- //

function playVideo()
{
  videoEl.play();
  playBtn.classList.remove("bx-play");
  playBtn.classList.add("bx-pause");
  playBtn.setAttribute("title","Pause");
}

function pauseVideo()
{
  videoEl.pause();
  playBtn.classList.remove("bx-pause");
  playBtn.classList.add("bx-play");
  playBtn.setAttribute("title","Play");
}


function videoPlayPause()
{
  if(videoEl.paused)
  {
    playVideo();
  }
  else
  {
    pauseVideo();
  }
}


// Progress Bar ---------------------------------- //
function getTime(timeInSec)
{
  let minutes = Math.floor(timeInSec/60);
  if(minutes < 10)
  {
    minutes = `0${minutes}`
  }
  let seconds = Math.floor(timeInSec%60);
  if(seconds < 10)
  {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

//Update Progress Bar as video Plays
function updateProgressBar()
{
  progressBar.style.width=`${(videoEl.currentTime/videoEl.duration)*100}%`;

  let currentTime = getTime(videoEl.currentTime);
  let durationTime = getTime(videoEl.duration);
  timeElapsed.textContent = `${currentTime} /`;
  timeDuration.textContent = `${durationTime}`;
}

//Seek Progress Bar when clicked on progress Range.
function setProgress(e)
{
  let widthPercentage = (e.offsetX/progressRange.offsetWidth)*100;
  progressBar.style.width = `${widthPercentage}%`;
  let timeElapsed = (widthPercentage*videoEl.duration)/100;
  videoEl.currentTime=timeElapsed;
  timeElapsed = getTime(timeElapsed);
  timeElapsed.textContent = `${timeElapsed} /`;
}

// Volume Controls --------------------------- //

function removeAllVolumeClass()
{
  volumeBtn.classList.remove("bxs-volume-full");
  volumeBtn.classList.remove("bxs-volume-mute");
  volumeBtn.classList.remove("bxs-volume-low");
}
let lastVolume = videoEl.volume;

//Mute and Unmute Volume 
function changeVolumeIcon()
{
  let volume = videoEl.volume;
  removeAllVolumeClass();
  if(volume !== 0)
  {
    volumeBtn.classList.add("bxs-volume-mute");
    volumeBtn.setAttribute("title","Unmute");
    lastVolume=volume
    volume=0;
    videoEl.volume=volume; 
  }
  else
  {
    if(lastVolume < 0.5)
      volumeBtn.classList.add("bxs-volume-low");
    else
      volumeBtn.classList.add("bxs-volume-full");

    volumeBtn.setAttribute("title","Mute");
    volume=lastVolume;
    videoEl.volume=volume;
  }
  volumeBar.style.width  = `${volume*100}%`;
}
// Set Volume Bar width on Click.
function updateVolumeBar(e)
{
  let progressVolume = (e.offsetX/volumeRange.offsetWidth);
  if(progressVolume < 0.1)
  {
    progressVolume = 0;
  }
  if(progressVolume > 0.9)
  {
    progressVolume = 1.0;
  }
  videoEl.volume = progressVolume;
  lastVolume=progressVolume;
  volumeBar.style.width  = `${progressVolume*100}%`;

  //Change Icon Depending on Volume.
  removeAllVolumeClass();
  if(progressVolume === 0)
  {
    volumeBtn.classList.add("bxs-volume-mute");
  }
  else if(progressVolume < 0.5)
  {
    volumeBtn.classList.add("bxs-volume-low");
  }
  else
  {
    volumeBtn.classList.add("bxs-volume-full");
  }

}


// Change Playback Speed -------------------- //

function changePlaybackSpeed()
{
  console.log(playerSpeed.value);
  videoEl.playbackRate=playerSpeed.value;
}


// Fullscreen ------------------------------- //

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  videoEl.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  videoEl.classList.remove("video-fullscreen");
}

let isFullscreen=false;
function toggleFullscreen()
{
  if(!isFullscreen)
  {
    openFullscreen(player);
  }
  else
  {
    closeFullscreen();
  }
  isFullscreen = !isFullscreen;
}

//Event Listeners
playBtn.addEventListener("click",videoPlayPause);
videoEl.addEventListener("click",videoPlayPause);
videoEl.addEventListener("ended",pauseVideo);
videoEl.addEventListener("canplay",updateProgressBar);
videoEl.addEventListener("timeupdate",updateProgressBar);
progressRange.addEventListener("click",setProgress);
volumeBtn.addEventListener("click",changeVolumeIcon);
volumeRange.addEventListener("click",updateVolumeBar);
playerSpeed.addEventListener("change",changePlaybackSpeed);
fullscreen.addEventListener("click",toggleFullscreen);
