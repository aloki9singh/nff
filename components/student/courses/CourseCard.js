import Image from "next/image";
import { useRouter } from "next/router";


const CourseCard = ({ title, desc, level, sessions, language, category, banner }) => {
	const router = useRouter()
	return (
		<div className=" rounded-2xl border-2 border-white shadow-lg bg-[#141518] h-[17rem] w-[18rem]  py-[10px] px-4 md:p-5 flex flex-col justify-around">
			<div className="flex justify-between ">
				<div>
					<Image
						src={banner || "/pagesgraphics/student/coursedescription/laptop.svg"}
						width={100}
						height={100}
						alt="f"
						className="md:w-[88px] md:h-[88px] w-[80px] h-[80px]"
					></Image>
				</div>
				<div className="text-[10px] md:text-sm text-[#E1348B] ">
					<span className="mr-3">{`${sessions ? sessions : ""} Lessons`}</span>
					<span>{level}</span>
				</div>
			</div>
			<a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light"></a>
			<div className="">
				<h1 className="text-slate-400 text-[15px] md:text-sm font-medium">
					COURSE
				</h1>
				<h1 className="text-white text-sm md:text-lg font-medium">{title}</h1>
				<div className="text-left pr-3">
					<p className="text-white text-sm md:text-[0.7rem] mb-1 md:mb-6 overflow-hidden overflow-ellipsis leading-2 line-clamp-3">
						{desc}
					</p>
				</div>
				<div className="flex justify-end">
					<button
						onClick={() => {
							router.push({
								pathname: '/beta/coursedetail',
								query: { title: title },
							});
						}}
						type="button"
						className="md:w-[111px] md:h-[39px] max-[768px]:mt-[-15px] md:mt-[-1rem] text-white border border-pink text-xs md:text-sm md:p-0 p-2"
					>
						Explore
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
