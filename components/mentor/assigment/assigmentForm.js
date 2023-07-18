import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Calender from '@/components/common/calendar/mentor/calendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import withMentorAuthorization from '@/lib/HOC/withMentorAuthorization.js';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  course: Yup.string().required('Course is required'),
  module: Yup.string().required('Module is required'),
  marks: Yup.number()
    .typeError('Marks must be a number')
    .required('Marks is required'),
  date: Yup.date().required('Date is required')
});

function AddAssigmentForm() {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    module: '',
    marks: '',
    date: ''
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Form data is valid, perform submission logic
        // ...

        // Reset form data
        setFormData({
          title: '',
          course: '',
          module: '',
          marks: '',
          date: ''
        });
        setErrors({});
      })
      .catch(validationErrors => {
        // Update errors state with validation errors
        const errors = {};
        validationErrors.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

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
              }>
              <option value='course1'>Course 1</option>
              <option value='course2'>Course 2</option>
              <option value='course3'>Course 3</option>
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
              <option value='module1'>Module 1</option>
              <option value='module2'>Module 2</option>
              <option value='module3'>Module 3</option>
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
                type='text'
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
                <div className='w-full h-full border-dashed border-2 rounded-xl bg-[#505057]'>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
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
                  </div>
                </div>
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
