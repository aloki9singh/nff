import StudyMaterialCard from "@/components/mentor/studymetrial/card";
import {
  StudyMaterialProvider,
  useStudyMaterialContext,
} from "@/lib/context/StudyMaterialContext";
import React, { useMemo } from "react";
import MetrialInfo from "@/components/mentor/studymetrial/metrialinfo";
import Select from "react-select";

function StudyMaterialMain() {
  const {
    modules,
    selectedModule,
    setSelectedModule,
    joinedCourses,
    setCourseID,
    courseID,
    isMentor,
  } = useStudyMaterialContext();

  const handleCardClick = (module) => {
    setSelectedModule(module);
  };

  const selectedCourse = useMemo(() => {
    const course = joinedCourses?.find((item) => item.id === courseID);
    return {
      value: course?.id,
      label: course?.title,
    };
  }, [courseID, joinedCourses]);

  console.log("selectedCourseName", selectedCourse);

  return (
    <>
      {!selectedModule && (
        <>
          {!isMentor && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={selectedCourse}
              onChange={(e) => {
                setCourseID(e.value);
                setSelectedModule(null);
              }}
              value={selectedCourse}
              isClearable={false}
              isSearchable={false}
              name="course"
              options={joinedCourses.map((course) => ({
                value: course.id,
                label: course.title,
              }))}
              styles={{
                container: (base) => ({
                  ...base,
                  maxWidth: "300px",
                  width: "100%",
                  background: "#373A41",
                  outline: "none",
                  color: "white",
                }),

                control: (base, state) => ({
                  ...base,
                  background: "#373A41",
                  outline: "none",
                  color: "white",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#373A41",
                  outline: "none",
                  color: "white",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                option: (
                  styles,
                  { data, isDisabled, isFocused, isSelected }
                ) => ({
                  ...styles,
                  backgroundColor: "#373A41",
                  cursor: "pointer",
                  ":hover": {
                    ...styles[":hover"],
                    backgroundColor: "#2E3036",
                  },
                  ":focus": {
                    ...styles[":focus"],
                    backgroundColor: "#2E3036",
                  },
                }),
              }}
            />
          )}
          <div className="mx-auto mt-6 text-white grow flex items-center  ">
            <div className=" flex md:bg-[#373A41] rounded-[30px] h-full  ">
              <div className="flex justify-center items-stretch   flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5">
                {modules.map((module, index) => (
                  <StudyMaterialCard
                    key={index}
                    module={module}
                    onClick={() => {
                      handleCardClick(module);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {selectedModule && <MetrialInfo />}
    </>
  );
}

export default function StudyMaterialWithContext() {
  return (
    <StudyMaterialProvider>
      <StudyMaterialMain />
    </StudyMaterialProvider>
  );
}
