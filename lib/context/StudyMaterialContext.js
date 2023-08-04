import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { HashLoader } from "react-spinners";
import {
  addLinkStudyMaterial,
  addPdfStudyMaterial,
  addVideoStudyMaterial,
  getStudyMaterial,
} from "../exportablefunctions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";

const StudyMaterialContext = createContext();

export const useStudyMaterialContext = () => useContext(StudyMaterialContext);

const getStudentJoinedCourses = async (uid) => {
  const data = await getDocs(collection(db, "allusers", uid, "joinedCourses"));

  const courses = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return courses;
}


export const StudyMaterialProvider = ({ children }) => {
  const { userProfile } = useAuthContext();
  const [modules, setModules] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joinedCourses, setJoinedCourses] = useState(null);
  const isMentor = userProfile?.role === "mentor" ? true : false;


  console.log("joinedCourses", joinedCourses)
  // const courseID = isMentor ? userProfile?.assignedCourses[0]
  const [courseID, setCourseID] = useState(isMentor ? userProfile?.assignedCourses[0] : null);

  useEffect(() => {
    if (!isMentor) {
      getStudentJoinedCourses(userProfile?.uid).then((courses) => {
        setCourseID(courses[0]?.id);
        setJoinedCourses(courses);
      });
    }
  }, [isMentor, userProfile?.uid]);


  const getModules = useCallback(async () => {
    if (!courseID) {
      return;
    }

    // setLoading(true);
    const data = await getStudyMaterial(courseID);
    setModules(
      data.map(module=>({
        ...module,
        pdf: module.pdf.map(pdf=>({
          ...pdf,
          createdAt: pdf.createdAt?.toMillis(),
        })),
      }))
    );

    return data;
    // setLoading(false);
  }, [courseID]);

  useEffect(() => {
    getModules();
  }, [getModules]);


  const addPdf = async (newPdf) => {
    if (!selectedModule) {
      return;
    }

    await addPdfStudyMaterial(courseID, selectedModule.id, newPdf);

    const data = await getModules();

    setSelectedModule((prev) => data.find((module) => module.id === prev.id));
  };

  const addVideo = async (newVideo) => {
    if (!selectedModule) {
      return;
    }

    await addVideoStudyMaterial(courseID, selectedModule.id, newVideo);

    const data = await getModules();

    setSelectedModule((prev) => data.find((module) => module.id === prev.id));
  };

  const addLink = async (newLink) => {
    if (!selectedModule) {
      return;
    }

    await addLinkStudyMaterial(courseID, selectedModule.id, newLink);

    const data = await getModules();

    setSelectedModule((prev) => data.find((module) => module.id === prev.id));
  };


  console.log("selectedModule", selectedModule)

  return (
    <StudyMaterialContext.Provider
      value={{
        modules,
        selectedModule,
        setSelectedModule,
        loading,
        courseID,
        addPdf,
        addVideo,
        addLink,
        isMentor,
        joinedCourses,
        setCourseID
      }}
    >
      {!modules ? (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      ) : (
        children
      )}
    </StudyMaterialContext.Provider>
  );
};
