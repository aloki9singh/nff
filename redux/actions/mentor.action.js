import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  
  import {
    callMentorGetApiMentor,
    callMentorPostApiMentor,
  } from "@/lib/mentorapi";
  import { callVerificationEmailApiMentor } from "@/lib/api";
  import {
    AUTH_SIGN_IN_ERROR,
    AUTH_SIGN_IN_LOADING,
    AUTH_SIGN_IN_SUCCESS,
    AUTH_SIGN_UP_ERROR,
    AUTH_SIGN_UP_LOADING,
    AUTH_SIGN_UP_SUCCESS,
  } from "../types/mentor.types";
  import { auth } from "../../config/firebaseconfig";
  
  // export const login = (dataobj) => async (dispatch) => {
  //   dispatch({ type: AUTH_SIGN_IN_LOADING });
  //   try {
  //     let res = await axios.post(``, dataobj);
  //     dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: res.data });
  //   } catch (e) {
  //     dispatch({ type: AUTH_SIGN_IN_ERROR, payload: e.message });
  //   }
  // };
  
  // export const logout = () => ({ type: AUTH_SIGN_OUT });
  
  export const signUp = (mentorLogData, router) => async (dispatch) => {
    dispatch({ type: AUTH_SIGN_UP_LOADING });
  
    const { email, pass } = mentorLogData;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const { user } = userCredential;
  
      const displayName = email;
      const datah = { displayName, email };
  
      // await sendEmailVerification(user);  // this will send email verification by firebase
      const val1 = await callVerificationEmailApiMentor(datah); //this will send by node mailer code
      alert("Verification email sent!!");
  
      const mentorData = {
        uid: user.uid,
        displayName: user.email,
        email: user.email,
        photoURL: user.photoURL,
      };
      callMentorPostApiMentor(mentorData);
      // data sent  to  user id
  
      router.push("/MentorVerify");
      dispatch({
        type: AUTH_SIGN_UP_SUCCESS,
        payload: {
          email: user.email,
          photoURL: user.photoURL,
          role: user.role,
          uid: user.uid,
          verified: user.verified,
        },
      });
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        dispatch({ type: AUTH_SIGN_IN_LOADING });
        signInWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
            // Log in successful
            const user = userCredential.user;
            callMentorGetApiMentor(user.uid).then(async(res) => {
            
              if (res.success == false) {
                const val1 = await callVerificationEmailApiMentor(datah); 
                alert("Verification email sent!!");
                const mentorData = {
                  uid: user.uid,
                  displayName: user.email,
                  email: user.email,
                  photoURL: user.photoURL,
                };
                callMentorPostApiMentor(mentorData);
                // data sent  to  user id
                router.push("/MentorVerify");
                dispatch({
                  type: AUTH_SIGN_UP_SUCCESS,
                  payload: {
                    email: user.email,
                    photoURL: user.photoURL,
                    role: user.role,
                    uid: user.uid,
                    verified: user.verified,
                  },
                });
              } else if (res.user && res.user.verified == true) {
                router.push("/mentor-dashboard");
                dispatch({
                  type: AUTH_SIGN_IN_SUCCESS,
                  payload: {
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                    role: res.user.role,
                    uid: res.user.uid,
                    verified: true,
                  },
                });
              } else {
                //if user back  without verifying and tries to login
                alert(
                  "Please Verify email! An email verification has been sent to your inbox."
                );
                //in this case email verification message sent again
                callVerificationEmailApiMentor({ displayName: email, email });
              }
            });
          })
          .catch((error) => {
            dispatch({ type: AUTH_SIGN_IN_ERROR, payload: error.message });
            console.error(error);
            alert("Either email / password is wrong!");
          });
        // alert("User is already registered!");
      } else {
        dispatch({ type: AUTH_SIGN_UP_ERROR, payload: error.message });
        alert(error.message);
        console.error(error);
      }
    }
  };
  