/// import { adminAuth } from '../config/firebaseAdminConfig';
import axios from 'axios';
export const callEmailApi = async (data) =>
  await fetch('/api/emails/sendemail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  });
export const callEmailApiMentor = async (data) =>
  await fetch('/api/emails/sendemailmentor', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  });

export const callVerificationEmailApi = async (data) =>
  await fetch('/api/emails/sendverificationemail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  });

export const callVerificationEmailApiMentor = async (data) =>
  await fetch('/api/emails/mentorverifyemail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => {
    if (!res.ok) console.log('Failed to send message');
    return res.json();
  });

// contanct  us form Post fn

export const contactFn = async (e, formData) => {
  e.preventDefault();

  try {
    await axios.post('/api/emails/receiveemail', formData);
    console.log('Email sent successfully');
    // Optionally, you can display a success message or redirect the user to a success page
  } catch (error) {
    console.error('Failed to send email:', error);
    // Optionally, you can display an error message to the user
  }
};

export const callVerificationEmailApiforseta = async (data) =>
  await fetch('/api/emails/setaverifyemail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to send message');
      return res.json();
    })
    .then((response) => {
      // Assuming the response contains a property 'success' indicating successful verification
      if (response.success) {
        // Redirect to the dashboard page
        router.push('/seta/dashboard');
      } else {
        // Handle the case when verification fails
        // You can show an error message or take appropriate action
      }
    })
    .catch((error) => {
      console.log(error);
      // Handle the error case
    });
