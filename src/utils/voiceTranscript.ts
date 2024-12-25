export function voiceclickHandler() {
  console.log("voice Button is clicked indeed");
  // start recording from user

  // call assemblyAi to transcribe recorded audio

  // convert transcription to transaction
}

let mediaRecorder: MediaRecorder;
let audioChunks: BlobPart[] = [];

export async function startButtonHandler() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    console.log(audioBlob);
    audioChunks = [];
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log(audioUrl);
    // audioElement.src = audioUrl;
  };

  mediaRecorder.start();
  // startButton.disabled = true;
  // stopButton.disabled = false;
}

export async function stopButtonHandler() {
  mediaRecorder.stop();
  // startButton.disabled = false;
  // stopButton.disabled = true;
}
