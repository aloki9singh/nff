import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { HashLoader } from "react-spinners";
import { addLinkStudyMaterial, addPdfStudyMaterial, addVideoStudyMaterial, getStudyMaterial } from "../exportablefunctions";


const StudyMaterialContext = createContext();

export const useStudyMaterialContext = () => useContext(StudyMaterialContext);

export const StudyMaterialProvider = ({ children }) => {
  const { userProfile } = useAuthContext();
  const [modules, setModules] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(false);

  const courseID = userProfile?.assignedCourses[0];


  const getModules = useCallback(async () => {
    if (!courseID) {
      return;
    }

    // setLoading(true);
    const data = await getStudyMaterial(courseID);
    setModules(data)
    // setLoading(false);
  }, [courseID])

  useEffect(() => {
    getModules();
  }, [getModules]);


  const addPdf = async (newPdf) => {

    if (!selectedModule) {
      return;
    }

    await addPdfStudyMaterial(courseID, selectedModule.id, newPdf);

    await getModules();
  }

  const addVideo = async (newVideo) => {

    if (!selectedModule) {
      return;
    }

    await addVideoStudyMaterial(courseID, selectedModule.id, newVideo);

    await getModules();
  }

  const addLink = async (newLink) => {

    if (!selectedModule) {
      return;
    }

    await addLinkStudyMaterial(courseID, selectedModule.id, newLink);

    await getModules();

    setSelectedModule(prev => (modules.find(module => module.id === prev.id))
    )

  }



  return (
    <StudyMaterialContext.Provider value={{
      modules,
      selectedModule,
      setSelectedModule,
      loading,
      courseID,
      addPdf,
      addVideo,
      addLink
    }}>
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
}