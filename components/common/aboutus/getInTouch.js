import { contactFnaboutus } from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";

const GetInTouch = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [title, setTitle] = useState("");
	const [subject, setSubject] = useState("");
	const formData = { title, email, name, phoneNo, subject };

	const clearFormFields = () => {
		setEmail("");
		setName("");
		setPhoneNo("");
		setTitle("");
		setSubject("");
	};

	return (
		<div className=" py-8 ">
			<section className="max-w-screen-md mx-auto">
				<h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl tracking-tight font-extrabold text-center bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
					Get in touch
				</h2>
				<p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 md:text-xl">
					We’d love to hear from you. Please fill out this form.
				</p>
				<form className="space-y-6">
					<div className="flex flex-col">
						<input
							type="text"
							id="name"
							onChange={(e) => setName(e.target.value)}
							className="py-2 md:px-3 align-start border-0 border-b border-white text-white dark:text-gray-300 focus:ring-none focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent  outline-0 w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
							placeholder="Your Name"
							required
						/>
					</div>
					<div className="flex flex-col">
						<input
							type="email"
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent outline-none w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
							placeholder="Company Email"
							required
						/>
					</div>
					<div className="flex flex-col">
						<input
							type="tel"
							maxLength={10}
							id="phone"
							onChange={(e) => setPhoneNo(e.target.value)}
							className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none   dark:focus:ring-none  dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent  outline-none w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
							placeholder="Phone Number"
							required
						/>
					</div>
					<div className="flex flex-col">
						<input
							type="text"
							onChange={(e) => setTitle(e.target.value)}
							id="title"
							className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none   dark:focus:ring-none dark:focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none   bg-transparent  outline-none w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
							placeholder="Title/Position"
							required
						/>
					</div>
					<div className="flex flex-col">
						<input
							type="text"
							onChange={(e) => setSubject(e.target.value)}
							id="subject"
							className="py-2 px-3  border-0 border-b border-white  dark:text-gray-300 focus:ring-none focus:border-none da dark:focus:ring-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none bg-transparent text-white outline-0 w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
							placeholder="Subject"
							required
						/>
					</div>
					<div className="flex justify-center items-center">
						<button
							onClick={(e) => {
								contactFnaboutus(e, formData);

								alert("Message Sent!");
								clearFormFields();
							}}
							type="submit"
							className="py-3 px-8 md:px-40 text-sm font-medium text-center bg-[#E1348B] text-white rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[90%] sm:w-[80%] md:w-[28rem]"
						>
							Connect With Us
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default GetInTouch;
