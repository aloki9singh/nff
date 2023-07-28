import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useCallback } from 'react';
import { storage } from '@/config/firebaseconfig';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateDoc, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import { collection } from 'firebase/firestore';
import { generate } from "shortid";

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  course: Yup.string().required('Course is required'),
  module: Yup.string().required('Module is required'),
  marks: Yup.number()
    .typeError('Marks must be a number')
    .required('Marks is required'),
  date: Yup.date().required('Date is required')
});

function AddAssigmentForm({ assignedCourse }) {
  const [file, setFile] = useState(null);
  const [key, setkey] = useState(0)
  const [url, setUrl] = useState("");
  const [selectedCourse, setSelectedCourse] = useState()
  const [progressData, setProgress] = useState()
  const [formData, setFormData] = useState({
    title: null,
    course: null,
    module: null,
    marks: null,
    date: null
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const uploadFile = useCallback(async () => {
    const storageRef = ref(storage, `newassignment/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setProgress(progress)
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file, uploadFile])

  const handleSubmit = async e => {
    e.preventDefault();
    const uid = selectedCourse[0]?.mentorid
    // Validate the form data using Yup
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        // const courseCollection = collection(db, "courses");
        // const q = query(courseCollection, where("mentorid", "==", uid));
        // const courseSnapshot = await getDocs(q);
        // courseSnapshot.docs.filter(async (docu) => {
        //   const data = docu.data();
        //   const docRef = docu.ref;
        //   if (data.title == formData.course) {
        //     const courseInfo = {
        //       assignment: [],
        //     };
        //     if (data.assignment){
        //       (data.assignment).forEach(element => {
        //         courseInfo.assignment.push(element)
        //       });
        //     }
        //     const courseassignment = {
        //       title: formData.title,
        //       course: formData.course,
        //       module: formData.module,
        //       marks: parseFloat(formData.marks),
        //       date: new Date(formData.date), // Make sure "formData.date" is a valid date string
        //       url: url,
        //       id: generate()
        //     };
        //     courseInfo.assignment.push(courseassignment);
        //     await updateDoc(docRef,courseInfo);
        //   }
        // });
        const courseCollection = collection(db, "courses");
        const q = query(courseCollection, where("mentorid", "==", uid));
        const courseSnapshot = await getDocs(q);
    
        courseSnapshot.docs.forEach(async (docu) => {
          const data = docu.data();
          const docRef = docu.ref;
    
          if (data.title === formData.course) {
            const assignmentSubCollectionRef = collection(docRef,'assignment');
    
            const newAssignmentData = {
              title: formData.title,
              course: formData.course,
              module: formData.module,
              marks: parseFloat(formData.marks),
              date: new Date(formData.date), // Make sure "formData.date" is a valid date string
              url: url,
              id: generate(), // Generating a unique ID for the new sub-collection document
              courseid: data.id
            };
    
            // Use addDoc to add a new document to the 'assignment' sub-collection
            await addDoc(assignmentSubCollectionRef, newAssignmentData);
          }
        });
    
        // console.log('New assignment sub-collection added successfully.')
      })
      .then(() => {
        // Reset form data and show success message (optional)
        setFormData({
          title: '',
          course: '',
          module: '',
          marks: '',
          date: ''
        });
        setkey((prevkey)=> prevkey+1)
        setFile('')
        setUrl('')
        setProgress('')
        setErrors({});
        alert("Assignment created successfully")
      })
      .catch(validationErrors => {
        // Handle validation errors
        const errors = {};
        validationErrors.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
        // console.log(err)
      })
      .catch(error => {
        // Handle other errors (e.g., Firebase save error)
        console.error('Error saving assignment:', error);
      });
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    setSelectedCourse(assignedCourse.filter((ele) => {
      return (ele.title == formData.course)
    }))
  }, [formData.course, assignedCourse])

  return (
    <>
      <div className='w-full h-full'>
        <form className='p-4 md:p-12' onSubmit={handleSubmit}>
          <div className='flex flex-col md:flex-row items-center'>
            <label htmlFor='title' className='text-white mb-2 md:mr-4'>
              Title:
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='w-full  md:w-64 p-2 mb-2 md:mb-0 md:ml-10 text-white rounded-lg bg-[#414348]'
              value={formData.title}
              placeholder='title'
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && <div className='text-red-500'>{errors.title}</div>}
          </div>

          <div className='flex flex-col md:flex-row items-center mt-4 md:mt-10'>
            <label htmlFor='course' className='text-white mb-2 md:mr-4'>
              Course:
            </label>
            <select
              id='course'
              name='course'
              className='w-full md:w-64 p-2 mb-2 md:mb-0 md:ml-4 text-white rounded-lg bg-[#414348]'
              value={formData.course}
              onChange={e =>
                setFormData({ ...formData, course: e.target.value })
              }
            >
              <option value="" selected disabled>Select</option>
              {assignedCourse ? assignedCourse.map((ele) => {
                return (
                  <option value={ele.title} key={ele.id}>{ele.title}</option>
                )
              }) : <option>No Course</option>}
            </select>
            {errors.course && (
              <div className='text-red-500'>{errors.course}</div>
            )}
          </div>

          <div className='flex flex-col md:flex-row items-center mt-4 md:mt-10'>
            <label htmlFor='Module' className='text-white mb-2 md:mr-4'>
              Module:
            </label>
            <select
              id='module'
              name='module'
              className='w-full md:w-64 p-2 mb-2 md:mb-0 md:ml-4 text-white rounded-lg bg-[#414348]'
              value={formData.module}
              onChange={e =>
                setFormData({ ...formData, module: e.target.value })
              }>
              <option value="" selected disabled>Select</option>
              {selectedCourse && selectedCourse[0]?.modules ? (selectedCourse[0]?.modules).map((ele) => {
                return (
                  <option value={ele.name} key={ele.id}>{ele.name}</option>
                )
              }) : <option>No modules</option>}
            </select>
            {errors.module && (
              <div className='text-red-500'>{errors.module}</div>
            )}
          </div>

          <div className='md:flex  flex md:justify-between'>
            <div className='flex flex-col md:flex-row items-center mt-4 md:mt-10'>
              <label htmlFor='marks' className='text-white mb-2 md:mr-4'>
                Marks:
              </label>
              <input
                type='number'
                id='marks'
                name='marks'
                className='w-full md:w-64 p-2 mb-2 md:mb-0 md:ml-6  text-white rounded-lg bg-[#414348]'
                value={formData.marks}
                onChange={e =>
                  setFormData({ ...formData, marks: e.target.value })
                }
              />
              {errors.marks && (
                <div className='text-red-500'>{errors.marks}</div>
              )}
            </div>
            <div className='w-full mt-4 ml-2 md:mt-10 md:ml-10 text-white rounded-lg'>
              <label htmlFor='date' className='text-sm font-md mr-10 md:mt-3'>
                Date:
              </label>
              <input
                name='date'
                value={formData.date}
                onChange={e =>
                  setFormData({ ...formData, date: e.target.value })
                }
                type='date'
                className='w-[80%] md:w-64 input rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 bg-[#414348]'
              />
              {errors.date && <div className='text-red-500'>{errors.date}</div>}
            </div>
          </div>

          <div className=' w-full mt-8 md:mt-10 text-white'>
            <div>Upload Assignment File</div>
            <div className='w-full  flex justify-center'>
              <div className='mt-10 flex items-center p-8 w-[80%]  h-48 rounded-lg border-2 border-[#5F6065] '>
                <input type='file' key={key} id='file' className='w-full h-full border-dashed border-2 rounded-xl bg-[#505057]' onChange={handleChange} hidden />
                <label htmlFor='file' className='w-full h-full flex flex-col items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-folder w-12 h-12 mb-2'>
                    <path d='M22 11V6c0-1.1-.9-2-2-2H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5' />
                    <rect x='2' y='2' width='20' height='8' rx='2' ry='2' />
                  </svg>

                  <p className='text-white text-center mt-2 text-xs'>
                    Click to Upload or drag and drop
                  </p>
                  <p className='text-white text-center text-xs mt-1'>
                    pdf, word document (max 2-5 MB)
                  </p>
                  {file?.name}<br />
                  {progressData && `${progressData}% done`}
                </label>
              </div>
            </div>
          </div>

          <div className='w-full h-full flex justify-end mt-16'>
            <button
              className='bg-[#AA2769] w-[20%] h-8 rounded-lg text-white'
              type='submit'
              disabled={Object.keys(errors).length > 0}>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAssigmentForm;
