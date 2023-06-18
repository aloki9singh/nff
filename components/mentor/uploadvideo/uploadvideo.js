// Verified by Pradhumn
import React, { useState, useEffect } from 'react';
import { storage } from '../../../config/firebaseconfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function UploadVid() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const uploadFile = async () => {
    const storageRef = ref(storage, `courseVideos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
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
  };
  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  const postForm = async () => {
    const data = {
      title,
      description,
      url,
    };
    await fetch('/api/courseVideos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data), alert('Video uploaded successfully'));
  };
  const uploadVideoHandler = (e) => {
    e.preventDefault();
    if (url) {
      postForm();
    } else {
      alert('Please upload a video');
    }
  };

  return (
    <form method="post" onSubmit={uploadVideoHandler}>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input type="file" name="file" id="file" onChange={handleChange} />
      <br />
      <input type="submit" value="Upload" />
    </form>
  );
}
