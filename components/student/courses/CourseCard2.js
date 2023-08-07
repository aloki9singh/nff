import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const CourseCard = ({
	id,
	title,
	desc,
	level,
	sessions,
	language,
	category,
	banner,
}) => {
	const router = useRouter();

	const isMetaModifyPage = router.pathname === '/meta/modifyCourses'||router.pathname === "/reta/modifyCourses"

	return (
		<div className="shrink-0 rounded-2xl border-2 border-white shadow-lg bg-[#141518] py-[10px] px-[12px] h-[250px] md:h-[17rem] mx-2 ml-0    md:p-5 flex flex-col ">
			<div className="flex justify-between ">
				<Image
					src={banner || "/pagesgraphics/student/coursedescription/laptop.svg"}
					width={100}
					height={100}
					alt="f"
					className="md:w-[80px] md:h-[80px] w-[65px] h-[65px]  object-contain"
				/>
				<div className="text-[10px] pt-3 md:pt-0 md:text-sm text-[#E1348B] ">
					<span className="mr-3 max-[1215px]:block max-[780px]:inline">{`${sessions ? sessions : ""} Lessons`}</span>
					<span>{level}</span>
				</div>
			</div>
			<a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light"></a>
			<div className="flex flex-col justify-between h-full overflow-hidden">
				<div>
					<h1 className="text-[#ffffff8c] text-[14px] md:text-[14px] md:text-sm font-medium">
						COURSE
					</h1>
					<h1 className="text-white  md:text-2xl text-xl">
						{title?.length > 16 ? title.slice(0, 16) + "..." : title}
					</h1>
					<p className="font-raleway text-left text-white text-[15px] md:text-[0.8rem]  overflow-hidden overflow-ellipsis leading-normal tracking-wide md:line-clamp-2 line-clamp-2">
						{desc?.split(" ").length > 10 ? desc?.split(" ").slice(0, 10).join(" ") + "..." : desc}
					</p>
				</div>
				<div className="flex justify-end pt-4">
					<Link
						href={router.pathname === '/meta/modifyCourses'||router.pathname ==='/reta/modifyCourses' ? {
							pathname: '/reta/addcourse',
							query: { id }
						} : {
							pathname: '/beta/coursedetail',
							query: { title }
						}}
						type="button"
						className=" text-white border border-pink text-xs  md:text-sm px-3 py-2 hover:bg-primary hover:text-white transition-all   duration-300 ease-in-out "
					>
						{isMetaModifyPage ? 'Modify' : 'Explore'}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
