import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "@/config/firebaseconfig";
import { useAuthContext } from "@/lib/context/AuthContext";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

const ReactMic = dynamic(
  () => import("react-mic").then((mod) => mod.ReactMic),
  { ssr: false }
);

export const AudioPlayer = ({ src }) => {
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const getWaveSurfer = async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      return WaveSurfer;
    };

    getWaveSurfer().then((WaveSurfer) => {
      wavesurferRef.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#ddd",
        progressColor: "#555",
        height: 100,
        barWidth: 2,
        cursorWidth: 0,
        responsive: true,
      });
      wavesurferRef.current.load(src);
    });
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [src]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        // is audio is completed then play from start
        if (
          wavesurferRef.current.getCurrentTime() ===
          wavesurferRef.current.getDuration()
        ) {
          wavesurferRef.current.play(0);
        } else {
          wavesurferRef.current.pause();
        }
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <div id="waveform" className="h-[100px]"></div>
      <button
        onClick={handlePlayPause}
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded overflow-hidden"
      >
        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
      </button>
    </div>
  );
};

const AudioRecorder = ({ groupId, setShowRecorder }) => {
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    // Clean up the recorder on component unmount
    return () => {
      if (recorder) {
        recorder.stopRecording();
      }
    };
  }, [recorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const RecordRTC = (await import("recordrtc")).default;
      const recorder = RecordRTC(stream, { type: "audio" });
      recorder.startRecording();
      setIsRecording(true);
      setRecorder(recorder);
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        setIsRecording(false);
        setAudioBlob(blob);
      });
    }
  };

  const pauseRecording = () => {
    if (recorder) {
      if (isPaused) {
        recorder.resumeRecording();
      } else {
        recorder.pauseRecording();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleSend = async () => {
    if (audioBlob) {
      try {
        const storageRef = ref(storage, "audio-messages/" + audioBlob.name);
        await uploadBytes(storageRef, audioBlob);

        const downloadURL = await getDownloadURL(storageRef);
        sendMessage(downloadURL);
      } catch (error) {
        console.log("Error uploading audio:", error);
      }
    }
  };

  const sendMessage = async (downloadURL) => {
    const chatId = groupId; // Replace with the actual chat ID
    const messagesRef = collection(db, "chatGroups", chatId, "messages");
    const newMessageRef = doc(messagesRef);

    const message = {
      messageId: newMessageRef.id,
      senderId: user.uid, //Replace with the actual sender ID
      type: "audio",
      content: downloadURL,
      timestamp: serverTimestamp(),
    };

    console.log("message", message);

    try {
      await setDoc(newMessageRef, message);
      // console.log("Message sent successfully:", newMessageRef.id);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div>
      {typeof window !== "undefined" && (
        <>
          <ReactMic
            record={isRecording}
            onStop={stopRecording}
            strokeColor="pink"
            backgroundColor="rgb(55, 58, 65)"
          />
          <button
            onClick={startRecording}
            disabled={isRecording}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              isRecording ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start Recording
          </button>
          {/* stop recording button */}
          {isRecording && (
            // pause/play button
            <>
              <button
                onClick={pauseRecording}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Stop Recording
              </button>
            </>
          )}
          {audioBlob && (
            <div className="mt-4">
              <AudioPlayer src={URL.createObjectURL(audioBlob)} />
              <button
                onClick={handleSend}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Send
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
