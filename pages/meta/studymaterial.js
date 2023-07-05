import StudyMaterialCard from "@/components/student/studymaterial.js/card";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";

function StudyMaterial() {
    const router = useRouter()
    return <div className="flex w-full">
        <div className="lg:col-span-1 hidden lg:grid w-[261px]">
            {" "}
            <MentorSidebar pathname={router.pathname} />
        </div>
        <div className="w-full bg-[#2E3036] rounded-l-3xl col-span-5 lg:col-span-4">
            <MentorTopbar heading={"Study Material"} />
            <hr className="hidden lg:block opacity-50 mt-4"></hr>
            <StudyMaterialCard />
        </div>
    </div>

}

export default StudyMaterial