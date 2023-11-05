// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");
const needRecord = document.getElementById("needRecord");
const videoRecorder = document.getElementById("videoRecorder");

let stream;
let recorder;
let videoFile;

const handleDownload = async (event) => {
  event.preventDefault();
  // const ffmpeg = createFFmpeg({
  //   mainName: "main",
  //   corePath: "https://unpkg.com/@ffmpeg/core-st@0.12.7/dist/ffmpeg-core.js",
  //   log: true,
  // });
  // await ffmpeg.load();
  // ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile)); //가상 컴퓨터에 파일 생성
  // await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "recording.webm";
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
