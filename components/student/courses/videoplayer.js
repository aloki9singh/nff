import { useState, useEffect, useRef } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import { storage } from "@/config/firebaseconfig";

const CourseVideoPlayer = ({ url }) => {
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [videoSrc, setVideoSrc] = useState(null);

	const videoUrl =
		"https://firebasestorage.googleapis.com/v0/b/neatskill.appspot.com/o/videos%2Freact-movie-app.mp4?alt=media&token=057a4833-a5a5-4f0c-9352-321071a6c31e";

	const videoRef = useRef(null);
	const playerRef = useRef(null);

	useEffect(() => {
		if (!url) return;

		setVideoSrc(url);
		// const videoStorageRef = ref(url);
		// getDownloadURL(videoStorageRef)
		// 	.then((url) => {
		// 		setVideoSrc(url);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error getting video download URL:", error);
		// 	});

		// return () => {
		// 	if (playerRef.current) {
		// 		playerRef.current.dispose();
		// 	}
		// };
	}, [url]);

	useEffect(() => {
		if (videoSrc && videoRef.current) {
			playerRef.current = videojs(videoRef.current, {
				sources: [{ src: videoSrc }],
				autoplay: true,
			});
			playerRef.current.on("loadedmetadata", () => {
				setIsVideoLoaded(true);
			});
		}

		return () => {
			if (playerRef.current) {
				playerRef.current.dispose();
			}
		};
	}, [videoSrc]);

	return (
		<div className='relative w-full aspect-w-16 aspect-h-9 mb-5'>
			{!isVideoLoaded && (
				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black'>
					<div className='animate-pulse text-white'>
						<svg
							className='w-8 h-8'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M17.6 19A8 8 0 004.4 19M8 4v6l4-2-4-2z'
							/>
						</svg>
					</div>
				</div>
			)}
			<video
				ref={videoRef}
				className='video-js md:w-[900px] md:h-[600px] sm:w-[300px] sm:h-[200px]'
				controls
			/>
		</div>
	);
};

export default CourseVideoPlayer;
