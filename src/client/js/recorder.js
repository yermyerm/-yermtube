const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");
const needRecord = document.getElementById("needRecord");
const videoRecorder = document.getElementById("videoRecorder");

let stream;
let recorder;
let videoFile;

const handleDownload = (event) => {
  event.preventDefault();
  const a = document.createElement("a");
  a.href = videoFile;
  const date = new Date();
  a.download = `${date.getTime()}.webm`;
  document.body.appendChild(a);
  a.click();
};
const handleStop = (event) => {
  event.preventDefault();
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};
const handleStart = (event) => {
  event.preventDefault();
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    console.log("recording done!");
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};
const handleRecord = (event) => {
  event.preventDefault();
  videoRecorder.classList = {};
  init();
  needRecord.innerText = "Close Video Recorder";
  needRecord.removeEventListener("click", handleRecord);
  needRecord.addEventListener("click", handleClose);
};
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
const handleClose = () => {
  videoRecorder.classList = "hidden";
  needRecord.innerText = "Need to Record New Video?";
  needRecord.removeEventListener("click", handleClose);
  needRecord.addEventListener("click", handleRecord);
};
needRecord.addEventListener("click", handleRecord);
startBtn.addEventListener("click", handleStart);
