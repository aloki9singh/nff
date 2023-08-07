import { db } from "@/config/firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const TeamSection = () => {
	const extractNameFromEmail = (email) => {
		const atIndex = email.indexOf("@");

		if (atIndex !== -1) {
			const name = email.substring(0, atIndex);
			return name;
		} else {
			return email;
		}
	};
	const scrollContainerRef = useRef(null);
	const [mentor, setMentor] = useState([]);
	useEffect(() => {
		const fetchPost = async () => {
			const q = query(
				collection(db, "allusers"),
				where("role", "==", "mentor")
			);
			const querySnapshot = await getDocs(q);
			const newData = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMentor(newData);
		};

		fetchPost();
	}, [mentor]);

	return (
		<div className="">
			<h1 className="mb-4  px-2 text-center text-2xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text lg:6xl">
				The team
			</h1>
			<div
				ref={scrollContainerRef}
				className="mb-8 flex  overflow-x-scroll  hide-scrollbar space-x-5 sm:space-x-10"
			>
				{mentor &&
					mentor.map((mentor, index) => {
						return (
							<a
								key={index}
								href="#"
								className="flex flex-col items-center
                    shrink-0 "
							>
								<Image
									src={`${
										mentor.photoURL
											? mentor.photoURL
											: "/componentsgraphics/common/Anonymousimage/anonymous.png"
									}`}
									height={100}
									width={100}
									className="w-[95px] sm:w-[140px] md:w-[200px]  object-cover bg-transparent rounded-xl aspect-[3/4]"
									alt="team memebers"
								/>
								<h2 className=" text-center mt-2 text-xs md:text-base text-white font-semibold">
									{extractNameFromEmail(mentor.displayName)}
								</h2>
							</a>
						);
					})}
			</div>
		</div>
	);
};

export default TeamSection;
