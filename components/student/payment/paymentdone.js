import Image from "next/image";
import Link from "next/link";

const PaymentCompleted = () => {
	return (
		<div className='w-full h-full relative'>
			<div className='flex min-w-[480px] w-1/2 mx-auto bg-[#373A41] rounded-3xl'>
				{/* Left div */}
				<div className='flex-[3_3_0%] mx-20 my-6'>
					<h1 className='text-sm text-white mb-2  font-thin'>Order Summary</h1>
					<h1 className='mb-2'>[Product Name]</h1>
					<div className='w-2/3'>
						<h1 className='mb-2 text-sm'>Order Details</h1>
						<div className='flex justify-between text-sm text-white mb-2  font-thin'>
							<span>Subtotal</span>
							<span>$167.00</span>
						</div>
						<div className='flex justify-between text-sm text-white mb-2  font-thin'>
							<span>Service Charge</span>
							<span>$167.00</span>
						</div>
						<div className='flex justify-between text-sm text-white mb-2 border-b  font-thin'>
							<span>Tax</span>
							<span>$167.00</span>
						</div>
						<div className='flex justify-between text-sm text-white mb-2  font-thin'>
							<span>Total</span>
							<span>$167.00</span>
						</div>
					</div>
					<div className='mt-10'>
						<button className='bg-[#E1348B] px-6 py-4 mr-4 text-sm rounded-md'>
							Download Receipt
						</button>
						<Link href='/'>
							<button
								className='bg-[#A145CD] px-6 py-4 text-sm rounded-md'
								href='/'>
								Home
							</button>
						</Link>
					</div>
				</div>
				{/* Right div */}
				<div className='flex-[2_2_0%] mr-8 my-6'>
					<h1 className='text-sm text-[#ffffff6d] mb-2'>Payment Completed</h1>
					<div>
						<div className='flex justify-between items-center mb-2'>
							<p className='text-sm'>46455 45675 43212 45788</p>
							<Image
								src='/componentsgraphics/student/paymentgateway/completion/maestro.svg'
								alt='card'
								width={10}
								height={10}
								className='w-8 h-5'
							/>
						</div>
						<h1 className='text-sm text-[#ffffff6d] mb-2'>Billing Address</h1>
						<p className='text-sm'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry&rsquo;s standard dummy
							text eve
						</p>
					</div>
				</div>
			</div>
			<div className='absolute bottom-0 left-0'>
				<Image
					src='/componentsgraphics/student/paymentgateway/completion/standing.svg'
					alt='standing'
					width={10}
					height={10}
					className='h-[350px] w-[350px] mb-2'
				/>
			</div>
		</div>
	);
};

export default PaymentCompleted;
