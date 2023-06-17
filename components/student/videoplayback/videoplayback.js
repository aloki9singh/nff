import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useEffect, useRef } from 'react';

export default function VideoPlayer() {
  const videoRef = useRef(null);
  let videoURL = '';
  useEffect(() => {
    const fetchVideo = async () => {
      await fetch('/api/courseVideos')
        .then((res) => res.json())
        .then((data) => {
          videoURL = data.courses[0].url;
        });
      const videoJSOptions = {
        sources: [
          {
            src: videoURL,
            type: 'video/mp4',
          },
        ],
        controls: true,
        autoplay: true,
        playbackRates: [0.5, 1, 1.5, 2],
      };
      videojs(videoRef.current, videoJSOptions, () => {
        //play video
        videoRef.current.play();
      });
    };
    fetchVideo();
  }, []);

  return (
    <div className="  w-full">
      <video
        ref={videoRef}
        id="my-player"
        width={'100%'}
        height={'520px'}
        className="video-js vjs-big-play-centered w-full rounded-2xl "
        controls
        preload="auto"
      ></video>
    </div>
  );
}
