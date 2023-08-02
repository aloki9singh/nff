const StepProgress = ({currentStep}) => {
    const step = ["Choose Plan", "Confirm & Payment","Completed"]
  return (
    <>
        <div className="flex">
            {step.map((item, index)=>(
                <div key={index} className="flex flex-col w-32 justify-center mt-5 mb-5">
                    <div className="flex flex-col items-center relative">
                        <div className={`bg-white rounded-full z-10 ${index==currentStep && "border-4 border-[#AA2769] h-4 w-4"} ${index!=currentStep && "h-3 w-3"} ${(currentStep==2 && (index==0 || index==1) || (currentStep==1 && index==0)) && "bg-[#AA2769]"}`}></div>
                        <div className={`h-[1px] border absolute top-0 m-auto bottom-0 border-[#96969a] ${index==1 && "w-full"} ${index==0 && "w-[50%] right-0"} ${index==2 && "w-[50%] left-0"}`}></div>
                    </div>
                    <h1 className="text-[10px] mt-2 text-center">{item}</h1>
                </div>
            ))}
        </div>
    </>
  )
}

export default StepProgress