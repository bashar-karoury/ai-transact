"use client";

import { transcactize_audio } from "@/utils/voiceTranscript";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/dashboard/dashboard.module.css";
// interface RecordTransactionButtonProps {
//   onTransactionRecorded: (newTransaction: object) => void; // Prop type for the callback function
// }
import { MicrophoneIcon } from "@heroicons/react/24/outline";
export default function RecordTransactionButton({ onTransactionRecorded }) {
  let audioChunks: BlobPart[] = [];
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioblob, setAudioblob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  async function startButtonHandler(event) {
    event.preventDefault();
    // setTimeout(() => {
    //   if (isRecording) {
    //     mediaRecorderRef.current?.stop();
    //     setIsRecording(false);
    //   }
    // }, 20000);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      console.log(audioBlob);
      audioChunks = [];
      setAudioblob(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  }

  async function stopButtonHandler(event) {
    event.preventDefault();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  useEffect(() => {
    async function extractHandler() {
      if (audioblob) {
        console.log(audioblob);
        setIsProcessing(true);
        try {
          const transaction = await transcactize_audio(audioblob);
          // console.log("transaction received", transaction);
          onTransactionRecorded(transaction);
        } catch (error) {
          console.log("Catch you");
          // console.log(error);
        } finally {
          setIsProcessing(false);
        }
      }
    }
    extractHandler();
  }, [audioblob]);

  return (
    <>
      <button
        className={styles.micButton}
        onMouseDown={startButtonHandler}
        onMouseUp={stopButtonHandler}
      >
        <MicrophoneIcon className={styles.micIcon} />
        {isRecording ? "Recording Now.." : "Record"}
      </button>
      {isProcessing ? "AI thinking.." : ""}
    </>
  );
}
