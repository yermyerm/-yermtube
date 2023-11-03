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
  playBtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};
const handleMute = (e) => {
  video.muted = !video.muted;
  muteBtn.classList = video.muted
    ? "fas fa-volume-high"
    : "fas fa-volume-xmark";
  volumeRange.value = video.muted ? "0" : volumeValue;
};
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.classList = "fas fa-volume-xmark";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) => {
  const time = new Date(seconds * 1000).toISOString().substring(14, 20);
  if (time[0] === "0") {
    return time.substring(1, 5);
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
    playBtn.classList = "fas fa-play";
  }
};
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  fullscreen ? document.exitFullscreen() : videoContainer.requestFullscreen();
};
const handleFullscreenBtnText = () => {
  const fullscreen = document.fullscreenElement;
  fullscreenBtn.classList = fullscreen ? "fas fa-compress" : "fas fa-expand";
};

const handleControlsShowing = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  videoControls.classList.remove("hidden");
  controlsTimeout = setTimeout(
    () => videoControls.classList.add("hidden"),
    3000
  );
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("click", handlePlayClick);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("timeupdate", handleVideoEnd);
video.addEventListener("mousemove", handleControlsShowing);
timeline.addEventListener("input", handleTimelineChange);
fullscreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("fullscreenchange", handleFullscreenBtnText);
