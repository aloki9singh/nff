// Page not found in given figma , CSS needed to be rechecked.
// This page ui is different from the figma design.


import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import Link from 'next/link';
import Image from 'next/image';
import NeatS from '/public/componentsgraphics/schools/login/neatskillslogosample.svg'

const numOfMentors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mentorLists = ['Dinesh Saini', 'Rahul', 'Raj', 'Ravi'];
const numOfModules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const categories = ['Web Development', 'App Development', 'UI/UX', 'Others'];

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [numModules, setNumModules] = useState(0);
  const [modules, setModules] = useState([]);
  const [category, setCategory] = useState(categories[0]);
  const [duration, setDuration] = useState(0);
  const [sessions, setsessions] = useState(0);
  const [language, setLanguage] = useState('English');
  const [details, setDetails] = useState('');
  const [level, setLevel] = useState('');
  const [numMentor, setNumMentor] = useState(0);
  const [leadMentor, setLeadMentor] = useState('');
  const [assistMentor, setAssistMentor] = useState([
    { id: 1, name: 'Dinesh Saini' },
    { id: 2, name: 'Rahul' },
    { id: 3, name: 'Raj' },
    { id: 4, name: 'Ravi' },
  ]);
  const [learn, setLearn] = useState([{ id: 1, point: '' }]);

  const addPoint = () => {
    setLearn([...learn, { id: learn.length + 1, point: '' }]);
    console.log(learn);
  };

  const handlePointChange = (id, point) => {
    setLearn(learn.map((l) => (l.id === id ? { ...l, point } : l)));
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    updatedModules[index] = { ...updatedModules[index], id: index + 1 };
    setModules(updatedModules);
  };

  const handleAssistanceMentorChange = (index, field, value) => {
    const updatedAssistanceMentors = [...assistMentor];
    updatedAssistanceMentors[index] = {
      ...updatedAssistanceMentors[index],
      [field]: value,
    };
    updatedAssistanceMentors[index] = {
      ...updatedAssistanceMentors[index],
      id: index + 1,
    };
    setAssistMentor(updatedAssistanceMentors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'courses'), {
        title,
        desc,
        numModules,
        modules,
        category,
        duration,
        sessions,
        language,
        details,
        level,
        numMentor,
        leadMentor,
        assistMentor,
        learn,
        data: serverTimestamp(),
      });

      await setDoc(doc(db, 'chatGroups', docRef.id), {
        groupId: docRef.id,
        members: [],
        name: title,
        isGroup: true,
        lastMessage: '',
        lastMessageTimestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      })

      console.log('Document written with ID: ', docRef.id);
      alert('added');

      resetForm();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setNumModules(0);
    setModules([]);
    setCategory(categories[0]);
    setDuration(0);
    setsessions(0);
    setLanguage('English');
    setDetails('');
    setLevel('');
    setNumMentor(0);
    setLeadMentor('');
    setAssistMentor([]);
    setLearn([{ id: 1, point: '' }]);
  };

  const renderModuleInputs = () => {
    if (!modules) {
      return null;
    }
    const moduleInputs = Array.from({ length: numModules }, (_, i) => {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = modules[i] || { id: i + 1, title: '', desc: '' };

      return (
        <>
          <div
            className="flex flex-col bg-[#404046] h-fit md:h-96 rounded-lg my-6"
            key={i}
          >
            <p className="px-8 py-4 md:py-6 text-xl">Add Module {i + 1}</p>
            <hr className="border-x-2 border-gray-500 mb-6" />
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
              <label htmlFor="">Module Subtitle:</label>
              <input
                type="text"
                value={module.title}
                onChange={(e) => handleModuleChange(i, 'title', e.target.value)}
                placeholder="Type here"
                className="AddMentorInput w-full md:w-3/4 h-10 rounded-lg px-2"
                style={{ background: '#333333' }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-4 md:mb-8">
              <label htmlFor="">Desc:</label>
              <textarea
                type="text"
                value={module.desc}
                onChange={(e) => handleModuleChange(i, 'desc', e.target.value)}
                placeholder="Type here"
                className="AddMentorInput w-full h-24 rounded-lg px-4 py-4"
                style={{ background: '#333333' }}
              />
            </div>
          </div>
          <br></br>
        </>
      );
    });

    return moduleInputs;
  };

  const renderMentorInputs = () => {
    const assistanceMentorInputs = Array.from(
      { length: numMentor - 1 },
      (_, i) => {
        const assistanceMentor = assistMentor[i] || {
          id: i + 1,
          name: '',
        };

        return (
          <div key={i}>
            <input
              type="text"
              value={assistanceMentor.name}
              placeholder="Assistant Mentor"
              className="AddMentorInput w-1/2 md:w-3/4 h-10 rounded-xl px-2"
              onChange={(e) =>
                handleAssistanceMentorChange(i, 'name', e.target.value)
              }
              style={{ background: '#333333' }}
            />
          </div>
        );
      }
    );
    return assistanceMentorInputs;
  };

  function removeMentorInput(id) {
    console.log('removed');
    setAssistMentor(assistMentor.filter((m) => m.id !== id));
  }

  return (
    <div className="text-white flex flex-col justify-center items-center px-5">
      {/* nav bar */}
      <div className="w-screen border-b-2 border-grey text-center">
        <div className=" flex justify-center gap-x-96 items-center">
          <Link href="/">
            <ul>
              <li className="ml-2   text-2xl uppercase hover:border-b text-white text-center h-[50px] md:h-[60px]">
                <Image
                  src={NeatS}
                  alt="logo"
                  className=" h-full"
                  width={200}
                  height={200}
                />
              </li>
            </ul>
          </Link>
          <div className="justify-start flex gap-2  sm:text-xs  md:text-md">
            <ul className="hidden sm:flex justify-center items-center  text-white sm:gap-0 lg:gap-12 pr-5 ">
              <Link href="/create-category">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Category
                </li>
              </Link>
              <Link href="/create-course">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Course
                </li>
              </Link>
              <Link href="/upload-video">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Upload video
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full md:w-10/12 h-max mx-auto px-4 bg-[#222222] rounded-lg mt-4 mb-4">
        <h1 className="text-2xl py-4">Create Course</h1>
        <hr className="border-x-2 border-gray-500 mb-4" />

        {/* course name */}
        <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
          <label htmlFor="">Course Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type here"
            className="AddMentorInput w-full md:w-2/4 h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
          />
        </div>

        {/* course desc */}
        <div className="w-full  flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
          <label htmlFor="">Course Subtitle:</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Type here"
            className="AddMentorInput w-full md:w-2/4 h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
          />
        </div>

        {/* course details */}
        <div className="w-full  flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
          <label htmlFor="">Course Description:</label>
          <textarea
            type="text"
            placeholder="Type here"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="AddMentorInput w-full md:w-4/6 h-20 rounded-lg px-2"
            style={{ background: '#333333' }}
          />
        </div>

        {/* duration, session and language */}
        <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 px-4 mb-8">
          <div className="md:w-1/2 flex flex-row items-center gap-x-2 mb-8">
            <label htmlFor="">Duration (in Weeks) :</label>
            <input
              type="number"
              className="AddMentorInput w-1/4 h-10 rounded-lg px-2"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              style={{ background: '#333333' }}
            />
          </div>
          <div className="md:w-1/2 flex items-center gap-x-2 px-4 mb-8">
            <label htmlFor="">Total Session :</label>
            <input
              type="number"
              value={sessions}
              onChange={(e) => setsessions(parseInt(e.target.value))}
              className="AddMentorInput w-1/4 h-10 rounded-lg px-2"
              style={{ background: '#333333' }}
            />
          </div>
          <div className="md:w-1/2 flex items-center gap-x-2 px-4 mb-8">
            <label htmlFor="">Language :</label>
            <div className="bg-[#313131] rounded-lg h-10 px-2">
              <select
                className="AddMentorInput w-32 h-10 rounded-lg"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ background: '#313131' }}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="french">french</option>
              </select>
            </div>
          </div>
        </div>

        {/* level */}
        <div className="w-full hidden md:w-3/4 md:flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 px-4 mb-8">
          <legend htmlFor="">Level :</legend>
          {/* <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
            <input type="radio" name="level" className="mr-2" />
            <label>All Level</label>
          </div> */}
          <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
            <input
              type="radio"
              name="level"
              value="Beginner"
              checked={level === 'Beginner'}
              onChange={(e) => setLevel(e.target.value)}
              className="mr-2"
            />
            <label>Beginner</label>
          </div>
          <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
            <input
              type="radio"
              name="level"
              value="Intermediate"
              checked={level === 'Intermediate'}
              onChange={(e) => setLevel(e.target.value)}
              className="mr-2"
            />
            <label>Intermediate</label>
          </div>
          <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
            <input
              type="radio"
              name="level"
              value="Advanced"
              checked={level === 'Advanced'}
              onChange={(e) => setLevel(e.target.value)}
              className="mr-2"
            />
            <label>Advanced</label>
          </div>
        </div>

        {/* number of mentor and lead mentor */}
        <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-start items-start md:items-center gap-y-3 md:gap-x-28 px-4 mb-4 md:mb-8">
          <div className="flex items-center gap-x-4">
            <label htmlFor="" className="text-xs md:text-base">
              Num of Mentor:
            </label>
            <div className="bg-[#313131] rounded-lg h-10 px-2">
              <select
                className="AddMentorInput w-36 md:w-32 h-10 rounded-lg"
                style={{ background: '#313131' }}
                value={numMentor}
                onChange={(e) => setNumMentor(parseInt(e.target.value))}
              >
                <option value="0">0</option>
                {numOfMentors.map((mentorNum) => (
                  <option key={mentorNum} value={mentorNum}>
                    {mentorNum}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-x-4 items-center">
            <label htmlFor="" className="text-xs md:text-base">
              Lead Mentor:
            </label>
            <div className="bg-[#313131] rounded-lg h-10 px-2">
              <select
                className="AddMentorInput w-48 md:w-60 h-10 rounded-lg"
                style={{ background: '#313131' }}
                value={leadMentor}
                onChange={(e) => setLeadMentor(e.target.value)}
              >
                <option value="null">Dinesh Saini</option>
                {mentorLists.map((mentor) => (
                  <option key={mentor} value={mentor}>
                    {mentor}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* assistance mentor */}
        <div className="border-2 border-gray-500 px-4 py-2 h-30">
          <div className="flex items-center gap-x-4 mb-4">
            <label htmlFor="" className="text-xs md:text-base">
              Assistant Mentor :
            </label>
            {renderMentorInputs()}
          </div>
          <div className="w-fit md:w-max flex flex-wrap md:flex-nowrap md:flex-row items-center gap-y-2 gap-x-2">
            {assistMentor.map((mentor) => (
              <div
                key={mentor.id}
                className="w-fit px-2 py-1 border-2 flex items-center gap-x-2 border-gray-500 rounded-lg"
              >
                <p>{mentor.name}</p>
                <IoClose onClick={() => removeMentorInput(mentor.id)} />
              </div>
            ))}
          </div>
        </div>

        <div className="my-4 flex items-center gap-x-4">
          <label htmlFor="">Number of Modules :</label>
          {/* <input
            type="text"
            placeholder="Type here"
            className="AddMentorInput w-1/4 h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
          /> */}
          <div className="bg-[#313131] rounded-lg h-10 px-2">
            <select
              className="AddMentorInput w-28 h-10"
              style={{ background: '#333333' }}
              onChange={(e) => setNumModules(parseInt(e.target.value))}
            >
              <option value="0">0</option>
              {numOfModules.map((moduleNum) => (
                <option key={moduleNum} value={moduleNum}>
                  {moduleNum}
                </option>
              ))}
            </select>
          </div>
        </div>

        {renderModuleInputs()}

        {/* category */}
        <div className="w-1/2 flex items-center gap-x-4 mt-4">
          <label htmlFor="">Category:</label>
          <div className="bg-[#313131] rounded-lg h-10 px-2">
            <select
              className="AddMentorInput w-48 h-10 bg-[#313131]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ background: '#333333' }}
            >
              <option value="null">Select a Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* learnings */}
        <div className="flex flex-col bg-[#404046] h-fit rounded-lg my-6">
          <p className="px-8 py-4 md:py-6 text-xl">What you&apos;ll learn</p>
          <hr className="border-x-2 border-gray-500 md:mb-6" />
          {learn.map((l) => (
            <div
              key={l.id}
              className="flex flex-col md:flex-row justify-start items-start gap-y-2 md:gap-x-2 px-4 my-4 md:my-8"
            >
              <label htmlFor="">learnings:</label>
              <textarea
                type="text"
                placeholder="Type here"
                id={`point-${l.id}`}
                value={l.point}
                onChange={(e) => handlePointChange(l.id, e.target.value)}
                className="AddMentorInput w-full h-18 rounded-lg px-4 py-4"
                style={{ background: '#333333' }}
              />
            </div>
          ))}

          <div className="flex justify-end px-2 py-1 mx-10">
            <button
              onClick={addPoint}
              className="w-fit border-2 border-gray-500 md:my-4 px-6 py-1 rounded-lg"
            >
              Add Point
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-1/2 md:w-2/12 h-10 bg-[#E1348B] rounded-lg mb-6"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
