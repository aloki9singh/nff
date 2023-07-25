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
import { MdDelete, MdSend } from "react-icons/md";
import { FaStop } from "react-icons/fa";

const ReactMic = dynamic(
  () => import("react-mic").then((mod) => mod.ReactMic),
  { ssr: false }
);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const AudioPlayer = ({ src }) => {
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const randomId = useRef(Math.floor(Math.random() * 1000000));

  useEffect(() => {
    const getWaveSurfer = async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      return WaveSurfer;
    };

    getWaveSurfer().then((WaveSurfer) => {
      wavesurferRef.current = WaveSurfer.create({
        container: `#waveform-${randomId.current}`,
        waveColor: "#ddd",
        progressColor: "#E1348B",
        height: 40,
        barWidth: 2,
        cursorWidth: 0,
        responsive: true,
      });
      wavesurferRef.current.load(src);
      wavesurferRef.current.on("audioprocess", handleAudioProcess);
    });
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [src]);

  const handleAudioProcess = (time) => {
    setCurrentTime(time);
  };

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
    <div className="flex items-center bg-[#9B9B9F] h-10 rounded-full px-2 gap-1 min-w-min">
      <button
        onClick={handlePlayPause}
        className=" text-white font-bold p-1 rounded overflow-hidden"
      >
        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
      </button>
      <div id={`waveform-${randomId.current}`} className="h-10 w-20 xl:w-32"></div>
      <div className="text-gray-600 text-xs xl:text-sm">{formatTime(currentTime)}</div>
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

    setShowRecorder(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#505057",
      }}
      className="flex-1 h-12 flex items-center rounded-[10px] ml-14 self-end"
    >
      <div className="ml-auto flex items-center gap-2">
        <button onClick={() => setShowRecorder(false)}>
          <MdDelete />
        </button>

        {audioBlob ? (
          <>
            <AudioPlayer src={URL.createObjectURL(audioBlob)} />

            <button
              onClick={handleSend}
              className="flex items-center justify-center p-2 pl-2 h-full"
              style={{
                backgroundColor: "#E1348B",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <MdSend style={{ transform: "rotate(-20deg)" }} />
            </button>
          </>
        ) : (
          <>
            <div className="w-32 h-8">
              <ReactMic
                record={isRecording}
                onStop={stopRecording}
                strokeColor="pink"
                backgroundColor="#505057"
                className="w-full h-full"
              />
            </div>
            {!isRecording && (
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={` text-white font-bold p-2 rounded ${
                  isRecording ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <BsPlayFill />
              </button>
            )}
            {/* stop recording button */}
            {isRecording && (
              // pause/play button
              <>
                <button
                  onClick={pauseRecording}
                  className=" text-white font-bold p-2 rounded "
                >
                  {!isPaused ? <BsPauseFill /> : <BsPlayFill />}
                </button>
                <button
                  onClick={stopRecording}
                  className=" text-white font-bold p-2 rounded "
                >
                  <FaStop />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
