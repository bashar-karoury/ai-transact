"use client";

import { transcactize_audio } from "@/utils/voiceTranscript";
import { useEffect, useRef, useState } from "react";
interface RecordTransactionButtonProps {
  onTransactionRecorded: (newTransaction: object) => void; // Prop type for the callback function
}

export default function RecordTransactionButton({
  onTransactionRecorded,
}: RecordTransactionButtonProps) {
  let audioChunks: BlobPart[] = [];
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioblob, setAudioblob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  async function startButtonHandler() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      // console.log(audioBlob);
      audioChunks = [];
      setAudioblob(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  }

  async function stopButtonHandler() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  useEffect(() => {
    async function extractHandler() {
      if (audioblob) {
        const transaction = await transcactize_audio(audioblob);
        // console.log("transaction received", transaction);
        onTransactionRecorded(transaction);
      }
    }
    extractHandler();
  }, [audioblob, onTransactionRecorded]);

  return (
    <>
      <button onMouseDown={startButtonHandler} onMouseUp={stopButtonHandler}>
        {isRecording ? "Recording Now.." : "Record"}
      </button>
    </>
  );
}
