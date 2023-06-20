import Image from "next/image";
import studyGirl from "@/public/componentsgraphics/common/homepage/join/Studygirl.svg";
// import curve2 from "../../public/curve2.png";
import bullet from "@/public/componentsgraphics/common/homepage/join/Bullet.svg";
import Link from "next/link";

export default function Join() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-bs">
			<div className="w-full py-4 px-4 text-white relative space-y-20 max-w-[1440px]">
				<div className=" bg-bs absolute top-0 left-0 w-full h-full -z-20 " />
				<Image
					width={400}
					height={400}
					alt="main"
					src={"/componentsgraphics/common/homepage/join/curve1.png"}
					className="absolute top-12 right-0 w-1/2 z-10 lg:w-1/5"
				/>
				<Image
					width={400}
					height={400}
					alt="main"
					src={"/componentsgraphics/common/homepage/join/curve2.png"}
					className="absolute bottom-24 scale-110 -rotate-[15deg] -translate-x-[40%]
        left-0 w-1/2 z-10 lg:w-1/5"
				/>
				<div className="w-full md:px-16 grid md:grid-cols-2 space-y-8">
					<div className="flex flex-col justify-center space-y-6 md:hidden  z-10">
						<h1 className="md:text-4xl text-2xl font-medium md:text-start text-center uppercase">
							Join our Neat Skills Community
						</h1>
						<p className="font-normal md:text-xl text-base flex items-center md:text-start text-center ">
							Learn any skill (coding , AI/ML , art , business, stock market ,
							marketing , video editing and much more) at just one nominal
							monthly subscription cequivalent to your sim card plan
						</p>
					</div>
					<div className="md:w-full h-full justify-center items-center flex">
						<Image
							src={studyGirl}
							width={400}
							style={{ width: "75%" }}
							height={0}
							className="rounded-2xl w-full z-20"
							alt="image"
						/>
					</div>
					<div className="flex flex-col justify-center space-y-6 z-10">
						<h1 className="lg:text-3xl text-2xl font-medium md:text-start text-center uppercase md:flex hidden">
							Join our Neat Skills Community
						</h1>
						<p className="font-normal md:text-lg text-base md:flex items-center md:text-start text-center hidden">
							Learn any skill (coding , AI/ML , art , business, stock market ,
							marketing , video editing and much more) at just one nominal
							monthly subscription cequivalent to your sim card plan
						</p>
						<div className="space-y-4 md:py-10">
							<div className="space-y-2 md:px-20">
								<div className="flex space-x-6">
									<Image src={bullet} alt="main" />
									<h1 className="font-semibold text-xl">Easily accessible</h1>
								</div>
								<p className="flex flex-col ml-10 font-normal text-base">
									Learn at the comfort of your home , with regular assessments
									and doubt sessions.
								</p>
							</div>
							<div className="space-y-2 md:px-20">
								<div className="flex space-x-6">
									<Image src={bullet} alt="main" />
									<h1 className="font-semibold text-xl">
										More affordable cost
									</h1>
								</div>
								<p className="flex flex-col ml-10 font-normal text-base">
									Monthly subscription cost equivalent to your sim card plan.
								</p>
							</div>
							<div className="space-y-2 md:px-20">
								<div className="flex space-x-6">
									<Image src={bullet} alt="main" />
									<h1 className="font-semibold text-xl">
										Fun learning experience
									</h1>
								</div>
								<p className="flex flex-col ml-10 font-normal text-base">
									Participate in competitions , earn badges and share on social
									media.
								</p>
							</div>
						</div>
						<div className="flex justify-center pt-5 pb-24">
							<Link href="/payment">
								<button className="border-2 border-[#E1348B] bg-[#000000] text-xl md:text-2xl w-64 h-16 justify-center items-center font-medium rounded-md z-40">
									Subscribe Now
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
