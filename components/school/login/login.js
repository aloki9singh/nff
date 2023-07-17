//verifed by Shreyas Sahoo
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../../styles/componentsstyling/auth/auth.module.css';

import NeatS from '/public/componentsgraphics/schools/login/neatskillslogosample.svg'
import neatSvg from '/public/componentsgraphics/schools/login/Group 2.svg';//space in name

import { AiOutlineMail } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, doc, query, where } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseconfig';
import { useRouter } from 'next/router';
import { callEmailApi, callVerificationEmailApiforseta } from '@/lib/api';
// import { adminAuth } from '../config/firebaseAdminConfig';

function SchoolLoginComp() {
    const router = useRouter();
    // const [email, setEmail] = useState('');
    const [schooluniqueID, setSchooluniqueID] = useState('');
    const [password, setPassword] = useState('');

    const login = async (schooluniqueID, password) => {
        try {
            const usersCollection = collection(db, "allusers");
            const q = query(usersCollection, where("authCode", "==", schooluniqueID));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const documentData = documentSnapshot.data();
                await signInWithEmailAndPassword(
                    auth,
                    documentData.email,
                    password,
                );
                router.push({
                    pathname:"/seta/profile"
                })

            }
            else{
                alert("Invalid School Code")
            }
            // const user = userCredential.user;
            // console.log(user);
            // await callVerificationEmailApiforseta(data);
            // alert('verification email sent!!');
            // await callEmailApi(data);
            // console.log(userCredential);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const handleLogin = async (e) => {
        // if (!email) {
        //     alert('Please enter your email');
        //     return;
        // }
        if (!password) {
            alert('Please enter your Password');
            return;
        }
        if (!schooluniqueID) {
            alert('Please enter your School Unique ID');
            return;
        }
        e.preventDefault();
        try {
            await login(schooluniqueID, password);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="md:w-1/2 md:h-full sd:w-full sd:h-1/3 bg-inherit  ">
                <div className=' h-full w-full py-20 flex flex-col items-center justify-center md:gap-8 sd:gap-2 relative '>
                    <Image className="xl:w-[270px] lg:w-[220px] md:w-[180px] sd:w-[130px]" src={NeatS} alt="" />
                    <div className={`${styles.Effect} xl:w-[60%] xl:h-[50%] lg:w-[50%] lg:h-[50%] md:w-[45%]  md:h-[40%] sd:w-[45%]  sd:h-[40%]  top-[10px] lg:left-[29px]  `}></div>
                    <div className=" md:w-[55%] sd:w-[30%]">
                        <Image src={neatSvg} className="w-full" alt="" />
                    </div>
                    <div className="text-white xl:text-[18px] lg:text-[16px] md:text-[13px] sd:text-[10px]">
                        <h3>Start learning right away !</h3>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 h-full sd:w-full sd:h-full bg-inherit flex items-center justify-center ">
                <div className="md:w-[90%] xl:w-[80%] sd:w-[80%] sd:h-[95%] lg:h-[85%] md:h-[80%] text-center bg-signupForm px-[10%] flex flex-col justify-center items-center gap-1 rounded-[30px]">
                    <h3 className="xl:text-[30px] lg:text-[25px] md:text-[22px] sd:text-[18px] text-white">School {''}
                        <span style={{ color: '#E1348B' }}>
                            <Link href={''}> Log In </Link>
                        </span>
                    </h3>

                    <div className="xl:w-[90%] md:w-full h-auto mt-6">
                        <form className="w-full h-auto flex flex-col gap-4 md:mt-1 ">
                            {/* <div className="w-full h-auto flex flex-col text-white text-left">
                                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px]">Email</span>
                                <div style={{
                                    "background-image":
                                        "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                                }} className="w-full h-auto flex xl:p-4  md:p-3 sd:p-2 items-center justify-start md:rounded-xl sd:rounded-md overflow-hidden">
                                    <AiOutlineMail
                                        size={'2.5vh'}
                                        style={{
                                            color: 'green',
                                            width: '30px',
                                            marginLeft: '2vh',
                                            marginRight: '2vh',
                                        }}
                                    />
                                    <input
                                        className="bg-inherit text-white w-full outline-none md:text-[12px] lg:text-[14px] sd:text-[12px]"
                                        type="email"
                                        placeholder="E-mail"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div> */}
                            <div className="w-full h-auto flex flex-col text-white text-left">
                                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px]">School Unique Id</span>
                                <div style={{
                                    "background-image":
                                        "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                                }} className="w-full h-auto flex  xl:p-4  md:p-3 sd:p-2 items-center justify-start md:rounded-xl sd:rounded-md overflow-hidden">
                                    <AiOutlineMail
                                        size={'2.5vh'}
                                        style={{
                                            color: 'green',
                                            width: '30px',
                                            marginLeft: '2vh',
                                            marginRight: '2vh',
                                        }}
                                    />
                                    <input
                                        className="bg-inherit text-white w-full outline-none md:text-[12px] lg:text-[14px] sd:text-[12px]"
                                        type="text"
                                        placeholder="Enter school code"
                                        onChange={(e) => setSchooluniqueID(e.target.value)}
                                        value={schooluniqueID}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="w-full h-auto flex flex-col text-white text-left">
                                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px] ">Password</span>
                                <div style={{
                                    "background-image":
                                        "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                                }} className="w-full h-auto flex py-4 xl:p-4  md:p-3 sd:p-2 items-center justify-start md:rounded-xl sd:rounded-md overflow-hidden">
                                    <FaLock
                                        size={'2.5vh'}
                                        style={{
                                            color: 'blue',
                                            width: '30px',
                                            marginLeft: '2vh',
                                            marginRight: '2vh',
                                        }}
                                    />
                                    <input
                                        className="bg-inherit text-white w-full outline-none md:text-[12px] lg:text-[14px] sd:text-[12px]"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                className='w-full xl:p-4 md:p-3 sd:p-2 md:text-[12px] lg:text-[16px] sd:text-[14px] bg-pink text-white rounded-lg'
                                onClick={handleLogin}
                            >
                                Login
                            </button>

                            <div className="text-white opacity-60 xl:text-[15px] lg:text-[13px] md:text-[12px] sd:text-[10px]">
                                <h5>
                                    Forgot your Password?
                                </h5>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SchoolLoginComp;
