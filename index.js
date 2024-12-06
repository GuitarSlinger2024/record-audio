const startButton = document.getElementById("start");
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const playBtn = document.getElementById('play')

startBtn.onclick = startRecording

const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(audioBlob);
          audio = new Audio(audioUrl);
          playBtn.onclick = playRecording.bind(this, audio)
          
          stream.getTracks().forEach((track) => track.stop());
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

async function startRecording() {
  startBtn.disabled = true;
  const recorder = await recordAudio();
  startButton.disabled = true;
  recorder.start();
  stopBtn.onclick = endRecording.bind(this, recorder)
};

function endRecording(recorder) {
  // const audio = await recorder.stop();
  recorder.stop();
  startBtn.disabled = false;
}

const playRecording = (audio) => {
  audio.play()
}