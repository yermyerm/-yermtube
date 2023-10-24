const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

video.volume = 0.5;
let volumeValue = video.volume;
let controlsTimeout = null;

const handlePlayClick = (e) => {
  video.paused ? video.play() : video.pause();
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMute = (e) => {
  video.muted = !video.muted;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? "0" : volumeValue;
};
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) => {
  const time = new Date(seconds * 1000).toISOString().substr(14, 5);
  if (time[0] === "0") {
    return time.substr(1, 4);
  } else {
    return time;
  }
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
const handleVideoEnd = () => {
  if (video.currentTime === video.duration) {
    console.log("Video ended!");
    video.currentTime = 0;
    playBtn.innerText = "Play";
  }
};
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  fullscreen ? document.exitFullscreen() : videoContainer.requestFullscreen();
};
const handleFullscreenBtnText = () => {
  const fullscreen = document.fullscreenElement;
  fullscreenBtn.innerText = fullscreen
    ? "Exit Full Screen"
    : "Enter Full Screen";
};

const handleControlsShowing = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsTimeout = setTimeout(
    () => videoControls.classList.remove("showing"),
    3000
  );
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("timeupdate", handleVideoEnd);
video.addEventListener("mousemove", handleControlsShowing);
timeline.addEventListener("input", handleTimelineChange);
fullscreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("fullscreenchange", handleFullscreenBtnText);
