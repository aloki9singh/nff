import StudyMaterialCard from '@/components/student/studymaterial.js/card';
import { useRouter } from 'next/router';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import MentorTopbar from '@/components/common/navbar/mentortopbar';

function StudyMaterial() {
  const router = useRouter();
  return (
    <div className="flex w-full">
      <div className="lg:col-span-1 hidden lg:grid w-[261px]">
        {' '}
        <CourseoverviewSidebar pathname={router.pathname} />
      </div>
      <div className="bg-[#2E3036] w-full rounded-[40px] col-span-5 lg:col-span-4">
        <MentorTopbar heading={'Study Material'} />
        <hr className="hidden lg:block opacity-50 mt-4" />
        <StudyMaterialCard />
      </div>
    </div>
  );
}

export default StudyMaterial;
