
import {db} from '@/config/firebaseconfig'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

export const callSchedulePostApiMentor = async (data) => {
    try {
      await addDoc(collection(db, 'mentorsSchedule'),data);
      // onClose
    } catch (err) {
      alert(err)
    }
  };
  
  // export const callMentorPostApiMentor = async (data) => {
  //   try {
  //     const response = await fetch("/api/mentorsdetail", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to Add Schedule");
  //     }
  
  //     return response.json();
  //   } catch (error) {
  //     // Handle the error
  //   }
  // };
  
  // export const callMentorGetApiMentor = async (id) => {
  //   try {
  //     const response = await fetch(`/api/mentorsdetail/${id}`);
  
  //     if (!response.ok) {
  //       throw new Error("Failed to Add Schedule");
  //     }
  
  //     return response.json();
  //   } catch (error) {
  //     // Handle the error
  //   }
  // };

  // useEffect(() => {
  //   const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
  //   onSnapshot(q, (querySnapshot) => {
  //     setTasks(querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // },[])
  
  export const callScheduleGetApiMentor = async (data) => {
    try {

      const q = query(collection(db, 'mentorsSchedule'), orderBy('created', 'desc'));
        onSnapshot(q, (querySnapshot) => {
        console.log(querySnapshot);
        })
    } catch (error) {
      // Handle the error
    }
  };
  