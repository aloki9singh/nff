import StudyMaterialCard from "@/components/mentor/studymetrial/card";
import {
  StudyMaterialProvider,
  useStudyMaterialContext,
} from "@/lib/context/StudyMaterialContext";
import React, { useMemo } from "react";
import MetrialInfo from "@/components/mentor/studymetrial/metrialinfo";
import Select from "react-select";
import Nodata from "@/components/common/nodata/nodata";

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

  console.log("selectedCourseName", selectedCourse.value === undefined);

  if (
    (isMentor && !courseID) ||
    (!isMentor && selectedCourse.value === undefined)
  ) {
    return (
      <div className=" flex items-center justify-center w-full h-screen mb-5">
        <Nodata title="Course" value="No Course available" />
      </div>
    );
  }
  return (
    <div className="flex flex-col mx-4 lg:mx-8 w-full h-full max-w-6xl">
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
              options={joinedCourses?.map((course) => ({
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

          <div className="mx-auto text-white flex w-full max-h-full pt-10 overflow-hidden">
            <div className=" flex justify-center bg-[#373A41] rounded-[30px] max-h-full w-full md:py-7 p-5 overflow-hidden">

              {modules?.length && <div className="grid sm:grid-cols-2 xl:grid-cols-3 w-full gap-3 md:gap-5 lg:gap-10  overflow-scroll scrollbar-hide">
                {modules?.map((module, index) => (
                  <div className="flex justify-center my-2" key={index}>
                    <StudyMaterialCard
                      key={index}
                      module={module}
                      onClick={() => {
                        handleCardClick(module);
                      }}
                    />
                  </div>
                ))}
              </div>}
              {
                !modules?.length ?
                  <div className="">
                    <Nodata value="Nothing to show here" />
                  </div> : ""
              }
            </div>
          </div>
        </>
      )}

      {selectedModule && <MetrialInfo />}
    </div>
  );
}

export default function StudyMaterialWithContext() {
  return (
    <StudyMaterialProvider>
      <StudyMaterialMain />
    </StudyMaterialProvider>
  );
}
