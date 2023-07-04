import StudyMaterialCard from "@/components/student/studymaterial.js/card";
import MentorSidebar from "@/components/common/sidebar/mentor";
import { useRouter } from "next/router";

function StudyMaterial() {
    const router = useRouter()
    return <div className="flex w-full">
        <div className="lg:col-span-1 hidden lg:grid w-[30%]">
            {" "}
            <MentorSidebar pathname={router.pathname} />
        </div>
        <div className=" col-span-5 lg:col-span-4">
        <StudyMaterialCard />
    </div>
    </div>

}

export default StudyMaterial