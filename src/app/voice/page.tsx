"use client";

import { useRef, useState } from "react";

export default function Page() {
  let audioChunks: BlobPart[] = [];
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  async function startButtonHandler() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      console.log(audioBlob);
      audioChunks = [];
      const newAudioUrl = URL.createObjectURL(audioBlob);
      console.log(newAudioUrl);
      setAudioUrl(newAudioUrl);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  }

  async function stopButtonHandler() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  return (
    <>
      <button onClick={startButtonHandler} disabled={isRecording}>
        startButton
      </button>
      ;
      <button onClick={stopButtonHandler} disabled={!isRecording}>
        stopButton
      </button>
      ;{audioUrl && <audio src={audioUrl} controls />}
    </>
  );
}
