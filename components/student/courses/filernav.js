import { useState } from 'react';

export default function FilterNav({
  courses,
  setCoursesAfterFilter,
  setFilterUsed,
}) {
  //Arrays
  const skills = [
    'Programming Language',
    'Data Analytics',
    'Design',
    'AI/ML',
    'Business',
    'Arts',
    'Web Development',
    'Music',
  ];
  const diff = ['Advanced', 'Beginner', 'Intermediate'];
  const sort = ['Most Popular', 'Recommended', 'Newest'];
  //States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  const clearFun = () => {
    document.getElementById('filterForm').reset();
    setFilterUsed(false);
    closeNav();
  };

  const closeNav = () => {
    document.getElementById('filterNav').style.transform = 'translate(100%,0)';
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(
        selectedDifficulties.filter((d) => d !== difficulty)
      );
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleApplyFilters = () => {
    let filteredCourses = [];

    // Filter courses by selected categories
    if (selectedCategories.length > 0) {
      filteredCourses = courses.filter((course) => {
        const courseCategoryindex = skills.indexOf(course.category);
        return selectedCategories.includes(String(courseCategoryindex));
      });
    } else {
      // If no categories are selected, show all courses
      filteredCourses = courses;
    }

    if (selectedDifficulties.length > 0) {
      filteredCourses = filteredCourses.filter((course) => {
        const filteredindex = diff.indexOf(course.level);
        return selectedDifficulties.includes(String(filteredindex));
      });
    }

    if (sort[sortBy] === 'Most Popular') {
      filteredCourses.sort((a, b) => b.rating - a.rating);
    } else if (sort[sortBy] === 'Newest') {
      filteredCourses.sort(
        (a, b) => new Date(b.date.seconds) - new Date(a.date.seconds)
      );
    }
    setCoursesAfterFilter(filteredCourses);
    setFilterUsed(true);
    closeNav();
  };

  return (
    <>
      <div className="text-white h-screen">
        <div className="flex justify-end m-4">
          <button
            onClick={closeNav}
            className="w-8 h-8 bg-[#535355] rounded-full flex items-center justify-center text-white"
          >
            &#10005;
          </button>
        </div>
        <div className="text-white flex justify-between font-bold text-base mb-2">
          <h3 className="font-bold text-base pl-4">Filter Courses</h3>
          <button
            onClick={clearFun}
            className="text-[#ffffff8f] font-bold text-sm mr-2"
          >
            Clear
          </button>
        </div>
        <form id="filterForm">
          <div className="mb-3">
            <h3 className="text-base pl-4 font-semibold text-[#ffffffba]">
              Skills
            </h3>
            <div className="border border-[#728095] mx-2 py-2 rounded-2xl">
              {Object.entries(skills).map(([key, value]) => (
                <div className="flex items-center px-2 py-1 text-sm" key={key}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={key}
                      checked={selectedCategories.includes(key)}
                      onChange={handleCategoryChange}
                      className="mr-2 w-4 h-4 border border-1 border-[#ffffff8f] rounded-sm accent-[#a145cd] opacity-80"
                    />
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <h3 className="text-base pl-4 font-semibold text-[#ffffffba]">
              Difficulty
            </h3>
            {Object.entries(diff).map(([key, value]) => (
              <div className="flex items-center px-4 py-1 text-sm" key={key}>
                <label>
                  <input
                    type="checkbox"
                    value={key}
                    checked={selectedDifficulties.includes(key)}
                    onChange={handleDifficultyChange}
                    className="mr-2 w-4 h-4 border border-1 border-[#ffffff8f] rounded-sm accent-[#a145cd] opacity-80"
                  />
                  {value}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <h3 className="text-base pl-4 font-semibold text-[#ffffffba]">
              Sort By
            </h3>
            {Object.entries(sort).map(([key, value]) => (
              <div className="flex items-center px-4 py-1 text-sm" key={key}>
                <label>
                  <input
                    type="radio"
                    value={key}
                    checked={sortBy === key}
                    onChange={handleSortByChange}
                    className="mr-2 w-4 h-4 border border-1 border-[#ffffff8f] rounded-sm accent-[#a145cd] opacity-80"
                  />
                  {value}
                </label>
              </div>
            ))}
          </div>
        </form>
        <div className="mx-auto w-fit">
          <button
            className="w-[330px] bg-[#a145cd] rounded-xl font-extrabold text-base px-10 py-2"
            onClick={handleApplyFilters}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </>
  );
}
