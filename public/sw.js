
if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>a(e,n),o={module:{uri:n},exports:r,require:t};s[n]=Promise.all(c.map((e=>o[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_EwkVjQcenWxqc_FSq2Qg/_buildManifest.js",revision:"150430adaa678bf50ede2aad9c06d2bd"},{url:"/_next/static/_EwkVjQcenWxqc_FSq2Qg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0c428ae2-63ff68a6d2d01757.js",revision:"63ff68a6d2d01757"},{url:"/_next/static/chunks/1281-ccb260dca0b04a09.js",revision:"ccb260dca0b04a09"},{url:"/_next/static/chunks/1313-060d15c22473344d.js",revision:"060d15c22473344d"},{url:"/_next/static/chunks/1398-644fd9b3b219e9eb.js",revision:"644fd9b3b219e9eb"},{url:"/_next/static/chunks/1529-0e7d5ecfc82c0d85.js",revision:"0e7d5ecfc82c0d85"},{url:"/_next/static/chunks/1664-b7c61323e77b2637.js",revision:"b7c61323e77b2637"},{url:"/_next/static/chunks/1852-be9305faf556ce6b.js",revision:"be9305faf556ce6b"},{url:"/_next/static/chunks/1974.40137af91d1a44e6.js",revision:"40137af91d1a44e6"},{url:"/_next/static/chunks/1a48c3c1-3b58b6561e5944aa.js",revision:"3b58b6561e5944aa"},{url:"/_next/static/chunks/1bfc9850-cd4be8ae72de650a.js",revision:"cd4be8ae72de650a"},{url:"/_next/static/chunks/252f366e-b4443be8258efd66.js",revision:"b4443be8258efd66"},{url:"/_next/static/chunks/2704-912a4a4572c662cc.js",revision:"912a4a4572c662cc"},{url:"/_next/static/chunks/2896-b3b8f4247ea6bae0.js",revision:"b3b8f4247ea6bae0"},{url:"/_next/static/chunks/2916-9015b2dc5d9dc6ab.js",revision:"9015b2dc5d9dc6ab"},{url:"/_next/static/chunks/2938-47c0d2f101c0d8f2.js",revision:"47c0d2f101c0d8f2"},{url:"/_next/static/chunks/301-3476ec7857fb9442.js",revision:"3476ec7857fb9442"},{url:"/_next/static/chunks/3342-b61bae74b498a79d.js",revision:"b61bae74b498a79d"},{url:"/_next/static/chunks/3365-32cebc1feab3661c.js",revision:"32cebc1feab3661c"},{url:"/_next/static/chunks/3372-ac579d3b8f8b595a.js",revision:"ac579d3b8f8b595a"},{url:"/_next/static/chunks/3541-438a878e0c19e71a.js",revision:"438a878e0c19e71a"},{url:"/_next/static/chunks/4223-aa4d46616029cc06.js",revision:"aa4d46616029cc06"},{url:"/_next/static/chunks/5675-4d0700efb27ae587.js",revision:"4d0700efb27ae587"},{url:"/_next/static/chunks/5806-1b7ffbc238861a99.js",revision:"1b7ffbc238861a99"},{url:"/_next/static/chunks/5880ce42.0f8a7524b6db5342.js",revision:"0f8a7524b6db5342"},{url:"/_next/static/chunks/6154-6dd821e59fa447d9.js",revision:"6dd821e59fa447d9"},{url:"/_next/static/chunks/6172-c1f9ec8645b60136.js",revision:"c1f9ec8645b60136"},{url:"/_next/static/chunks/6310-d8e04bea11d0e012.js",revision:"d8e04bea11d0e012"},{url:"/_next/static/chunks/6538-250407d0c3e19825.js",revision:"250407d0c3e19825"},{url:"/_next/static/chunks/6829-8597a27109bb19e0.js",revision:"8597a27109bb19e0"},{url:"/_next/static/chunks/6864-6434202ede4a9edb.js",revision:"6434202ede4a9edb"},{url:"/_next/static/chunks/6891-42874093afc2a54c.js",revision:"42874093afc2a54c"},{url:"/_next/static/chunks/6893-0c8a453f15e02be6.js",revision:"0c8a453f15e02be6"},{url:"/_next/static/chunks/7222-3cc2d6b94d7b36a0.js",revision:"3cc2d6b94d7b36a0"},{url:"/_next/static/chunks/7409-a0458036645afd04.js",revision:"a0458036645afd04"},{url:"/_next/static/chunks/742-0bfa5b632406c2a0.js",revision:"0bfa5b632406c2a0"},{url:"/_next/static/chunks/78e521c3-e430efdd76ea5ee9.js",revision:"e430efdd76ea5ee9"},{url:"/_next/static/chunks/814c6784-1e26d47d40efdaf4.js",revision:"1e26d47d40efdaf4"},{url:"/_next/static/chunks/8160-430591bf4f5d1c3f.js",revision:"430591bf4f5d1c3f"},{url:"/_next/static/chunks/8224-cbce6cb45f6172fa.js",revision:"cbce6cb45f6172fa"},{url:"/_next/static/chunks/9107-4bfd0500a4169294.js",revision:"4bfd0500a4169294"},{url:"/_next/static/chunks/925e0f50.d3b4ed83ec64275f.js",revision:"d3b4ed83ec64275f"},{url:"/_next/static/chunks/95b64a6e-1daaa8ca9f076ac6.js",revision:"1daaa8ca9f076ac6"},{url:"/_next/static/chunks/9935-6df1c02453727540.js",revision:"6df1c02453727540"},{url:"/_next/static/chunks/9b380ffa-4261cbe7bb2c26c0.js",revision:"4261cbe7bb2c26c0"},{url:"/_next/static/chunks/c31f1870-1be59d1ced4fd35c.js",revision:"1be59d1ced4fd35c"},{url:"/_next/static/chunks/d0c16330-6d0d4e08e84563bf.js",revision:"6d0d4e08e84563bf"},{url:"/_next/static/chunks/d64684d8-c9fe38f0dbbc0a1b.js",revision:"c9fe38f0dbbc0a1b"},{url:"/_next/static/chunks/d7eeaac4-9310969b7822780d.js",revision:"9310969b7822780d"},{url:"/_next/static/chunks/ee8b1517-1e9cf2562e0eb1e4.js",revision:"1e9cf2562e0eb1e4"},{url:"/_next/static/chunks/framework-3671d8951bf44e4e.js",revision:"3671d8951bf44e4e"},{url:"/_next/static/chunks/main-9b54760dbf1836c0.js",revision:"9b54760dbf1836c0"},{url:"/_next/static/chunks/pages/_app-a3cbf8fbf89d4899.js",revision:"a3cbf8fbf89d4899"},{url:"/_next/static/chunks/pages/_error-bd1da5a6907513b5.js",revision:"bd1da5a6907513b5"},{url:"/_next/static/chunks/pages/alpha/404-1506235a26e751ad.js",revision:"1506235a26e751ad"},{url:"/_next/static/chunks/pages/alpha/aboutus-2ebcfade69797b4e.js",revision:"2ebcfade69797b4e"},{url:"/_next/static/chunks/pages/alpha/contactus-2950c854ebbb3f61.js",revision:"2950c854ebbb3f61"},{url:"/_next/static/chunks/pages/alpha/helpandsupport-4f082949c97473f9.js",revision:"4f082949c97473f9"},{url:"/_next/static/chunks/pages/alpha/noInternet-de9ba0ac708fa8e0.js",revision:"de9ba0ac708fa8e0"},{url:"/_next/static/chunks/pages/alpha/privacypolicy-c1d758ec8fdf1d4f.js",revision:"c1d758ec8fdf1d4f"},{url:"/_next/static/chunks/pages/alpha/refundpolicy-0651ba0bf8e8d1e5.js",revision:"0651ba0bf8e8d1e5"},{url:"/_next/static/chunks/pages/alpha/termsandconditions-17fe4b567b2d2be8.js",revision:"17fe4b567b2d2be8"},{url:"/_next/static/chunks/pages/alpha/underwork-5d2b4e7e2e87c463.js",revision:"5d2b4e7e2e87c463"},{url:"/_next/static/chunks/pages/beta/assignments-3a9a1d066906c2f2.js",revision:"3a9a1d066906c2f2"},{url:"/_next/static/chunks/pages/beta/assignments/feedback-f0f3de08d6b44274.js",revision:"f0f3de08d6b44274"},{url:"/_next/static/chunks/pages/beta/assignmentupload-87d996d9ceece377.js",revision:"87d996d9ceece377"},{url:"/_next/static/chunks/pages/beta/chats-8b738494c9ab0ab2.js",revision:"8b738494c9ab0ab2"},{url:"/_next/static/chunks/pages/beta/checkclass-3adfc51b3382b8d9.js",revision:"3adfc51b3382b8d9"},{url:"/_next/static/chunks/pages/beta/coursedetail-a06fe36b2418a20c.js",revision:"a06fe36b2418a20c"},{url:"/_next/static/chunks/pages/beta/courseoverview-0f4857ca1ad7a294.js",revision:"0f4857ca1ad7a294"},{url:"/_next/static/chunks/pages/beta/dashboard-cb0ab68693cca1d7.js",revision:"cb0ab68693cca1d7"},{url:"/_next/static/chunks/pages/beta/login-2c46f758ed918b8e.js",revision:"2c46f758ed918b8e"},{url:"/_next/static/chunks/pages/beta/pay-9ce9b39a90622e98.js",revision:"9ce9b39a90622e98"},{url:"/_next/static/chunks/pages/beta/payment-f3020b1570e94e4a.js",revision:"f3020b1570e94e4a"},{url:"/_next/static/chunks/pages/beta/paymentFailed-d99a512e066ab592.js",revision:"d99a512e066ab592"},{url:"/_next/static/chunks/pages/beta/profile-87252c36818d78e6.js",revision:"87252c36818d78e6"},{url:"/_next/static/chunks/pages/beta/profilecongrats-5d85294750ef929e.js",revision:"5d85294750ef929e"},{url:"/_next/static/chunks/pages/beta/profilecontinue-e9329567245c896d.js",revision:"e9329567245c896d"},{url:"/_next/static/chunks/pages/beta/profiledetails-e410205e8fc0087e.js",revision:"e410205e8fc0087e"},{url:"/_next/static/chunks/pages/beta/setting-8b1f9c3ece6bcb1e.js",revision:"8b1f9c3ece6bcb1e"},{url:"/_next/static/chunks/pages/beta/signup-cca2b06d53bea0e1.js",revision:"cca2b06d53bea0e1"},{url:"/_next/static/chunks/pages/beta/studymaterial-b3fca9377f2d75d9.js",revision:"b3fca9377f2d75d9"},{url:"/_next/static/chunks/pages/beta/videoplayback-c159ad01f085a2c6.js",revision:"c159ad01f085a2c6"},{url:"/_next/static/chunks/pages/index-81ce8d2fff39117e.js",revision:"81ce8d2fff39117e"},{url:"/_next/static/chunks/pages/meta/addassignment-578901b171b1d641.js",revision:"578901b171b1d641"},{url:"/_next/static/chunks/pages/meta/assignments-63ad538f9bb27067.js",revision:"63ad538f9bb27067"},{url:"/_next/static/chunks/pages/meta/assignments/%5Buid%5D-7450da779a194a1f.js",revision:"7450da779a194a1f"},{url:"/_next/static/chunks/pages/meta/assignments/feedback-4b59565a823cb02d.js",revision:"4b59565a823cb02d"},{url:"/_next/static/chunks/pages/meta/assignments/file-1ddaf23e4b2f9cfe.js",revision:"1ddaf23e4b2f9cfe"},{url:"/_next/static/chunks/pages/meta/chats-90b495ac62985f5b.js",revision:"90b495ac62985f5b"},{url:"/_next/static/chunks/pages/meta/congratsAddAssigment-c3b5d89fd2bcd92a.js",revision:"c3b5d89fd2bcd92a"},{url:"/_next/static/chunks/pages/meta/contactus-4757b2a4a2e28d00.js",revision:"4757b2a4a2e28d00"},{url:"/_next/static/chunks/pages/meta/courses-83af9aad51d7896f.js",revision:"83af9aad51d7896f"},{url:"/_next/static/chunks/pages/meta/dashboard-a3a27c07733d33cb.js",revision:"a3a27c07733d33cb"},{url:"/_next/static/chunks/pages/meta/mentorprofile-29eb96501c217e89.js",revision:"29eb96501c217e89"},{url:"/_next/static/chunks/pages/meta/metrialInfo-fe2efb5d625d069a.js",revision:"fe2efb5d625d069a"},{url:"/_next/static/chunks/pages/meta/modifyCourses-21c72bf1ee585bb7.js",revision:"21c72bf1ee585bb7"},{url:"/_next/static/chunks/pages/meta/profile-b9354c7c4751f821.js",revision:"b9354c7c4751f821"},{url:"/_next/static/chunks/pages/meta/register-9ba694ae798a159c.js",revision:"9ba694ae798a159c"},{url:"/_next/static/chunks/pages/meta/schedule-9a05d4278a5a7381.js",revision:"9a05d4278a5a7381"},{url:"/_next/static/chunks/pages/meta/setting-511005da3970fe1f.js",revision:"511005da3970fe1f"},{url:"/_next/static/chunks/pages/meta/signup-11724db909d807ef.js",revision:"11724db909d807ef"},{url:"/_next/static/chunks/pages/meta/signupsuccess-5206ed4576ee8148.js",revision:"5206ed4576ee8148"},{url:"/_next/static/chunks/pages/meta/student-f59765bf542626d6.js",revision:"f59765bf542626d6"},{url:"/_next/static/chunks/pages/meta/studentprofile-53eec862aa287621.js",revision:"53eec862aa287621"},{url:"/_next/static/chunks/pages/meta/studymaterial-69fbbf3c66effe8e.js",revision:"69fbbf3c66effe8e"},{url:"/_next/static/chunks/pages/meta/uploadvideo-92379097517010ba.js",revision:"92379097517010ba"},{url:"/_next/static/chunks/pages/meta/verify-778ddbc3119fc611.js",revision:"778ddbc3119fc611"},{url:"/_next/static/chunks/pages/reta/CongratsAddTeam-e17f86e55d888278.js",revision:"e17f86e55d888278"},{url:"/_next/static/chunks/pages/reta/addcategory-c9c958aa051910f8.js",revision:"c9c958aa051910f8"},{url:"/_next/static/chunks/pages/reta/addcourse-d241c945b98e63e4.js",revision:"d241c945b98e63e4"},{url:"/_next/static/chunks/pages/reta/addcourse/congrats-e8ed318ff8772de8.js",revision:"e8ed318ff8772de8"},{url:"/_next/static/chunks/pages/reta/addmentor-cf2ba6494115f722.js",revision:"cf2ba6494115f722"},{url:"/_next/static/chunks/pages/reta/addteam-647c1b267cdf270e.js",revision:"647c1b267cdf270e"},{url:"/_next/static/chunks/pages/reta/dashboard-7286c38c43ce135d.js",revision:"7286c38c43ce135d"},{url:"/_next/static/chunks/pages/reta/login-66c33d7fcd570deb.js",revision:"66c33d7fcd570deb"},{url:"/_next/static/chunks/pages/reta/mentordetails-19e1fd72921c7924.js",revision:"19e1fd72921c7924"},{url:"/_next/static/chunks/pages/reta/mentorprofile-26fe4f7cd3d03ba7.js",revision:"26fe4f7cd3d03ba7"},{url:"/_next/static/chunks/pages/reta/mentors-e08a6f49a97e90b2.js",revision:"e08a6f49a97e90b2"},{url:"/_next/static/chunks/pages/reta/modifyCourses-f968c2868df2b0c2.js",revision:"f968c2868df2b0c2"},{url:"/_next/static/chunks/pages/reta/otpverification-5ea0289bc637bc55.js",revision:"5ea0289bc637bc55"},{url:"/_next/static/chunks/pages/reta/profile-46ef6bb2a7b86df4.js",revision:"46ef6bb2a7b86df4"},{url:"/_next/static/chunks/pages/reta/signupsuccesscheck if needed-77978db9ca808fa6.js",revision:"77978db9ca808fa6"},{url:"/_next/static/chunks/pages/reta/viewteam-be8151a26ae6d540.js",revision:"be8151a26ae6d540"},{url:"/_next/static/chunks/pages/seta/dashboard-6e192f2a1a49165a.js",revision:"6e192f2a1a49165a"},{url:"/_next/static/chunks/pages/seta/login-034915676582a265.js",revision:"034915676582a265"},{url:"/_next/static/chunks/pages/seta/profile-58a35804ecf1668e.js",revision:"58a35804ecf1668e"},{url:"/_next/static/chunks/pages/seta/register-5977265b668d0084.js",revision:"5977265b668d0084"},{url:"/_next/static/chunks/pages/seta/signup-bddbc664921987e6.js",revision:"bddbc664921987e6"},{url:"/_next/static/chunks/pages/seta/students-d3f5f74af546d928.js",revision:"d3f5f74af546d928"},{url:"/_next/static/chunks/pages/seta/studentsdetails-3840b862ba08378f.js",revision:"3840b862ba08378f"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e74528b0154fcad1.js",revision:"e74528b0154fcad1"},{url:"/_next/static/css/526e13cc41eaf86c.css",revision:"526e13cc41eaf86c"},{url:"/_next/static/css/5d3d34789a2240ec.css",revision:"5d3d34789a2240ec"},{url:"/_next/static/css/6cd46c6d6ab69681.css",revision:"6cd46c6d6ab69681"},{url:"/_next/static/css/9b99cf6b35f0b2d0.css",revision:"9b99cf6b35f0b2d0"},{url:"/_next/static/css/ae4ed9c503fd1e33.css",revision:"ae4ed9c503fd1e33"},{url:"/_next/static/css/c96c32edc8811842.css",revision:"c96c32edc8811842"},{url:"/_next/static/css/d0320de32467736e.css",revision:"d0320de32467736e"},{url:"/_next/static/media/Adminlogingraphic.7d6466c1.svg",revision:"9847ddb8fffd062c477ba718b270f9b8"},{url:"/_next/static/media/Bullet.0e97bc90.svg",revision:"fbec5610110b7c5aa7c69e1bb7313215"},{url:"/_next/static/media/Group 11.5a09cd36.svg",revision:"6d0bfb4715c47be3e8c018d8184899d4"},{url:"/_next/static/media/Group 2.c1a52ec1.svg",revision:"32ffaa4463fdfcab27a00084053f42f5"},{url:"/_next/static/media/Img2.fb703684.svg",revision:"4b670c75c0f58c146c271b3d8e783d98"},{url:"/_next/static/media/Studygirl.4b1c7aaf.svg",revision:"d6e65e46285cb5a344b2211ceee05ab8"},{url:"/_next/static/media/_Google.2f38dc6f.svg",revision:"4f8989124ab7defe4f70239625780a36"},{url:"/_next/static/media/booksicon.e9a80e28.svg",revision:"1b3e5f544ffbf1c9a0f49e8230efa1e2"},{url:"/_next/static/media/brownfilledcircle.69065cc0.svg",revision:"aca4b554ffa6d1c99705153f2f5b55b0"},{url:"/_next/static/media/chartbaricon.14e84ef4.svg",revision:"7135ca4837044fc6590ff804ca0426e2"},{url:"/_next/static/media/desktopicon.5a09cd36.svg",revision:"6d0bfb4715c47be3e8c018d8184899d4"},{url:"/_next/static/media/laptopicon.e0ad0b5f.svg",revision:"79ecdccc2cbe2c2fe80e1ed0163d5738"},{url:"/_next/static/media/manstandingwithlaptop.22dec343.svg",revision:"599e1ec347d51bc3337b07406e4f624f"},{url:"/_next/static/media/neatskillslogosample.02ca52a4.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/_next/static/media/pfpsample.60135b55.svg",revision:"fd76cf0f20546ec3c3e79e4e5f367f3b"},{url:"/_next/static/media/profile.60135b55.svg",revision:"fd76cf0f20546ec3c3e79e4e5f367f3b"},{url:"/_next/static/media/purplefilledcircle.d782f969.svg",revision:"540102d355f8f6e836436bf984ca1e4c"},{url:"/_next/static/media/searchicon.00b41431.svg",revision:"6d5200645894377cfa32e03c5d25405b"},{url:"/_next/static/media/semicircle.caa5c350.svg",revision:"78f68b220ecfc302ab3c3eadba31fd20"},{url:"/componentsgraphics/common/Anonymousimage/anonymous.png",revision:"f1d48004df790405a099436396e60e4a"},{url:"/componentsgraphics/common/aboutpage/about.png",revision:"bbc0082fae233cf227b7e721f4a294ed"},{url:"/componentsgraphics/common/aboutpage/abouttalking.svg",revision:"264f8b6d0f847f60d4d8fd573c0cdeb5"},{url:"/componentsgraphics/common/aboutpage/team1.svg",revision:"9ff153ba73deb4f6b09d42f3007d8b24"},{url:"/componentsgraphics/common/aboutpage/team2.svg",revision:"e363efaab4d2516d153a558334e799c0"},{url:"/componentsgraphics/common/aboutpage/team3.svg",revision:"b68894a11fd7b5be8eed81d257b156fd"},{url:"/componentsgraphics/common/aboutpage/teamImage.png",revision:"0ef1a8785d2fd1f7765a7c8353cfa4d3"},{url:"/componentsgraphics/common/calendar/datelist/caretcircleleft.svg",revision:"cfd826fcffd32f1f5e896011bf5031bd"},{url:"/componentsgraphics/common/calendar/datelist/caretcircleright.svg",revision:"0fc56b65467aee35cdbe83643843cbeb"},{url:"/componentsgraphics/common/calendar/sidebody/Videoplayericon.svg",revision:"c4f91cd78e87d5e7d3be5e82960c3fd3"},{url:"/componentsgraphics/common/chatting/chattingarea/Img2.svg",revision:"4b670c75c0f58c146c271b3d8e783d98"},{url:"/componentsgraphics/common/chatting/chattingarea/profile.svg",revision:"fd76cf0f20546ec3c3e79e4e5f367f3b"},{url:"/componentsgraphics/common/chatting/sidebar/navbar/profile.svg",revision:"fd76cf0f20546ec3c3e79e4e5f367f3b"},{url:"/componentsgraphics/common/chatting/user/profile.svg",revision:"fd76cf0f20546ec3c3e79e4e5f367f3b"},{url:"/componentsgraphics/common/helpandsupportpage/EnvelopeSimple.svg",revision:"dccc0e6aafac0610be518f2bc2e29180"},{url:"/componentsgraphics/common/helpandsupportpage/HandPointing.svg",revision:"f3762a50d59f10e3991a9c9b0e05d0d6"},{url:"/componentsgraphics/common/helpandsupportpage/Megaphone.svg",revision:"b0a3d019db22f0cb678b1159943c4050"},{url:"/componentsgraphics/common/helpandsupportpage/Student.svg",revision:"a07d24823e6fe857bf603328c11c814a"},{url:"/componentsgraphics/common/homepage/activities/Book.svg",revision:"705ce99baa74aca51c74cb9e4993b8ce"},{url:"/componentsgraphics/common/homepage/activities/Question.svg",revision:"d5805e5f29dd34809f46f495c9fae8a7"},{url:"/componentsgraphics/common/homepage/activities/activities.png",revision:"9bdbda7f055b46dfc67bfdf7a2846003"},{url:"/componentsgraphics/common/homepage/activities/activities.svg",revision:"0944be5e3ae0c7a917e2a8c237125a3e"},{url:"/componentsgraphics/common/homepage/activities/live.png",revision:"b95059d8a5b127371cc91142979db40f"},{url:"/componentsgraphics/common/homepage/activities/meet.png",revision:"e9f61cf0a9bdd089c5609348160ccc05"},{url:"/componentsgraphics/common/homepage/activities/video.png",revision:"37989358329edad5870d715999431585"},{url:"/componentsgraphics/common/homepage/explorecourses/Certificate.svg",revision:"a4275adec5215df168c48bd5f216a75f"},{url:"/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",revision:"f70ba2b169a9d9875aced30d1e5c3563"},{url:"/componentsgraphics/common/homepage/explorecourses/arrow.png",revision:"16ad94083cf50f2eb9436dfdb429b5af"},{url:"/componentsgraphics/common/homepage/footer/neatskillslogosample.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/homepage/home/Group174.png",revision:"d68251bdcde008422488aa9859fb8951"},{url:"/componentsgraphics/common/homepage/home/Group174.svg",revision:"b873011a498322355b247056c046ac8c"},{url:"/componentsgraphics/common/homepage/home/Vector-12.svg",revision:"80789bf81dc388dca8d48c91fa6cf3b7"},{url:"/componentsgraphics/common/homepage/homecard/FolderNotch.svg",revision:"c6cc6f4c0bbc48f38d66f8f816192768"},{url:"/componentsgraphics/common/homepage/join/Bullet.svg",revision:"fbec5610110b7c5aa7c69e1bb7313215"},{url:"/componentsgraphics/common/homepage/join/Studygirl.svg",revision:"d6e65e46285cb5a344b2211ceee05ab8"},{url:"/componentsgraphics/common/homepage/join/curve1.png",revision:"4d9c9a91db80dd8174021e42ab8a294b"},{url:"/componentsgraphics/common/homepage/join/curve2.png",revision:"5c2266c359c3beae39c49fc30dbd92ac"},{url:"/componentsgraphics/common/homepage/signup/3.png",revision:"27420dd4962dab57d0797e9fdfd5d094"},{url:"/componentsgraphics/common/homepage/signup/5.svg",revision:"1a8a447d1f1755d582cd8ae6593f3132"},{url:"/componentsgraphics/common/homepage/why/why.svg",revision:"c4b3e8ad778b02e7eaf0b94404c5837e"},{url:"/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/navbar/schoolprofiletopbar/Male.svg",revision:"bc3b09050fb1cf3952e846c279c277bd"},{url:"/componentsgraphics/common/navbar/schooltopbar/Male.svg",revision:"bc3b09050fb1cf3952e846c279c277bd"},{url:"/componentsgraphics/common/nodata/nodata.svg",revision:"dcfeb720337da55cce7b38928ff2bb50"},{url:"/componentsgraphics/common/settings/profile/Female.svg",revision:"f0a9f9ccb460d88c2d78b95012e72592"},{url:"/componentsgraphics/common/sidebar/courseoverviewsidebar/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/sidebar/liveclasssidebar/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/sidebar/mentorsidebar/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/sidebar/schoolsidebar/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/sidebar/sidebar/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/common/underprogress/brownfilledcircle.svg",revision:"aca4b554ffa6d1c99705153f2f5b55b0"},{url:"/componentsgraphics/common/underprogress/dottedpattern.svg",revision:"8d1f8d8f7504b48b1788b778ba1af9f3"},{url:"/componentsgraphics/common/underprogress/manstandingwithlaptop.svg",revision:"599e1ec347d51bc3337b07406e4f624f"},{url:"/componentsgraphics/common/underprogress/purplefilledcircle.svg",revision:"540102d355f8f6e836436bf984ca1e4c"},{url:"/componentsgraphics/common/underprogress/semicircle.svg",revision:"78f68b220ecfc302ab3c3eadba31fd20"},{url:"/componentsgraphics/mentor/FolderNotch.svg",revision:"1b93ebe82bc9151d1bb191a68a9b8281"},{url:"/componentsgraphics/mentor/fileupload.svg",revision:"10a7493b5059e592e938cd08fba69f0d"},{url:"/componentsgraphics/mentor/mentorcard/mentorpfpsample.svg",revision:"f0a9f9ccb460d88c2d78b95012e72592"},{url:"/componentsgraphics/mentor/monthselector/caretcircleleft.svg",revision:"cfd826fcffd32f1f5e896011bf5031bd"},{url:"/componentsgraphics/mentor/monthselector/caretcircleright.svg",revision:"0fc56b65467aee35cdbe83643843cbeb"},{url:"/componentsgraphics/mentor/schedule/mentorsidebar/neatskillslogosample.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/mentor/schedule/studentsidebar/neatskillslogosample.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/mentor/signup/neatskillslogosample.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/mentor/signup/teachingsample.svg",revision:"e81fe0fc0a34a4706cb349228109568e"},{url:"/componentsgraphics/mentor/tick.svg",revision:"7a8fa8843ae515aedea8703a8ca1f55d"},{url:"/componentsgraphics/schools/back.svg",revision:"71cfbdd5d7af617e3d36eaf782db11b8"},{url:"/componentsgraphics/schools/login/Group 2.svg",revision:"32ffaa4463fdfcab27a00084053f42f5"},{url:"/componentsgraphics/schools/login/neatskillslogosample.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/student/courses/card/MagnifyingGlass.svg",revision:"07039d18fa5296d1bcfe89c687fa43ae"},{url:"/componentsgraphics/student/courses/card/laptopicon.svg",revision:"208e84aac4216db1741e5f342681d814"},{url:"/componentsgraphics/student/courses/header/booksicon.svg",revision:"1b3e5f544ffbf1c9a0f49e8230efa1e2"},{url:"/componentsgraphics/student/courses/header/desktopicon.svg",revision:"6d0bfb4715c47be3e8c018d8184899d4"},{url:"/componentsgraphics/student/courses/header/laptopicon.svg",revision:"79ecdccc2cbe2c2fe80e1ed0163d5738"},{url:"/componentsgraphics/student/courses/header/pfpsample.svg",revision:"fd76cf0f20546ec3c3e79e4e5f367f3b"},{url:"/componentsgraphics/student/courses/header/searchicon.svg",revision:"6d5200645894377cfa32e03c5d25405b"},{url:"/componentsgraphics/student/courses/list/chartbaricon.svg",revision:"7135ca4837044fc6590ff804ca0426e2"},{url:"/componentsgraphics/student/courses/navbar/neatskillslogosample.svg",revision:"919eef5b4953cadd85b5710aae42784a"},{url:"/componentsgraphics/student/dashboard/dashboardcard/laptop.svg",revision:"208e84aac4216db1741e5f342681d814"},{url:"/componentsgraphics/student/dashboard/inactivecomp/Programmer coding on laptop.svg",revision:"d770d66a20d96e5adaa2857471f3c9c8"},{url:"/componentsgraphics/student/paymentgateway/completion/Standing.svg",revision:"cc260df57caf0740387eb110335c5d14"},{url:"/componentsgraphics/student/paymentgateway/completion/maestro.svg",revision:"4c287f2190f4cc022f6d723ee72639c4"},{url:"/componentsgraphics/student/paymentgateway/plan/Tick.png",revision:"917d3fdf0cb50670a0d1f08fc0fc6627"},{url:"/componentsgraphics/student/studymaterial/laptop.svg",revision:"208e84aac4216db1741e5f342681d814"},{url:"/componentsgraphics/student/studymaterial/studentlogin/logincomp/Group 2.svg",revision:"32ffaa4463fdfcab27a00084053f42f5"},{url:"/componentsgraphics/student/studymaterial/studentlogin/logincomp/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/student/studymaterial/studentlogin/logincomp/_Google.svg",revision:"4f8989124ab7defe4f70239625780a36"},{url:"/componentsgraphics/student/studymaterial/studentlogin/signincomp/Group 2.svg",revision:"32ffaa4463fdfcab27a00084053f42f5"},{url:"/componentsgraphics/student/studymaterial/studentlogin/signincomp/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/componentsgraphics/student/studymaterial/studentlogin/signincomp/_Google.svg",revision:"4f8989124ab7defe4f70239625780a36"},{url:"/favicon.ico",revision:"7712b8c36441b2d213c4ecc3196e054b"},{url:"/icon-192x192.png",revision:"3264a44724f121150e5e606cbd28e15b"},{url:"/icon-256x256.png",revision:"908c26b283c4970ca2d8d232d57f2699"},{url:"/icon-384x384.png",revision:"eb39ef217488b79cfa12c1e9ef01a19c"},{url:"/icon-512x512.png",revision:"b718e1bc7c7ced9beb3bc71497d8d964"},{url:"/manifest.json",revision:"5983ad808753e20a0215a42e25256fa7"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/pagesgraphics/admin/AddTeam/Frame.svg",revision:"07690bc2bd4d2c54b9400e826e3d8da5"},{url:"/pagesgraphics/admin/AddTeam/Neatskills.svg",revision:"ce876af35519f781bd335ada59cab3df"},{url:"/pagesgraphics/admin/AddTeam/amico.svg",revision:"8fa6c005c2a400770ad260397124f0c2"},{url:"/pagesgraphics/admin/login/Adminlogingraphic.svg",revision:"9847ddb8fffd062c477ba718b270f9b8"},{url:"/pagesgraphics/admin/login/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/pagesgraphics/admin/login/_Google.svg",revision:"4f8989124ab7defe4f70239625780a36"},{url:"/pagesgraphics/admin/login/otpverification.svg",revision:"03fde479d3775ac03c8f7ef1e8178fee"},{url:"/pagesgraphics/admin/login/signupsuccess.svg",revision:"723d6634dcee6b85283f364f3b3e6be6"},{url:"/pagesgraphics/admin/welcome/FolderSimplePlus.svg",revision:"3fcb92b199895a19cfcdeefd27e12295"},{url:"/pagesgraphics/admin/welcome/UserList.svg",revision:"96479254efc18f5cc7b7937ea6f56e35"},{url:"/pagesgraphics/admin/welcome/UsersThree.svg",revision:"f6ef640ba88f060aeff431a4a9ce7461"},{url:"/pagesgraphics/admin/welcome/studentsandmentors.svg",revision:"77dc5de89be9f4cd00a737e151d28c34"},{url:"/pagesgraphics/common/contactus/MapPin.svg",revision:"8fc7c410fcae365685873796202b7a60"},{url:"/pagesgraphics/common/contactus/call.svg",revision:"231dc2ef819f5a50ac318b7c0ea5c8d4"},{url:"/pagesgraphics/common/contactus/mail.svg",revision:"2010766d4f3d4d47c14974764d946003"},{url:"/pagesgraphics/common/createcategory/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/pagesgraphics/common/createcourse/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/pagesgraphics/common/errors/404.svg",revision:"e72c3629627b82b4fc5c74ae57c6bac3"},{url:"/pagesgraphics/common/errors/nointernet.svg",revision:"3742293853a361d7f3361ecdc4f780b5"},{url:"/pagesgraphics/mentor/Frame.svg",revision:"07690bc2bd4d2c54b9400e826e3d8da5"},{url:"/pagesgraphics/mentor/congratulations/Blur effect.svg",revision:"1da33f2f8fdac77d79610d3c4e0e05cc"},{url:"/pagesgraphics/mentor/congratulations/transparent sparkle.svg",revision:"76f3045cbcc95260934cfaeb5fc705dc"},{url:"/pagesgraphics/mentor/profile/ProfileGirlimg.svg",revision:"7d32d4a0af85867172426270deb34eeb"},{url:"/pagesgraphics/mentor/profile/ProgrammingIcon.svg",revision:"d770d66a20d96e5adaa2857471f3c9c8"},{url:"/pagesgraphics/mentor/profile/degree_icon.svg",revision:"6a30d3e177fc0d8c7ffecf839048cf4a"},{url:"/pagesgraphics/mentor/profile/globe_icon.svg",revision:"4f84a7351ba4b757430f6d51cd45953e"},{url:"/pagesgraphics/mentor/profile/location_icon.svg",revision:"b5d167ea01f002eac21abe92300e95c9"},{url:"/pagesgraphics/mentor/signupsuccess/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/pagesgraphics/mentor/signupsuccess/signupsuccess.svg",revision:"723d6634dcee6b85283f364f3b3e6be6"},{url:"/pagesgraphics/mentor/uploadvideo/Neatskills.svg",revision:"e8c360e1b588e495eb960759ef863106"},{url:"/pagesgraphics/mentor/verification/Group 1997.svg",revision:"9348f5dd638ab9014d87c491837de2a1"},{url:"/pagesgraphics/mentor/verification/freepik--paper-planes--inject-41.svg",revision:"c1853723227140a1e1b916cc70fabd34"},{url:"/pagesgraphics/mentor/verification/freepik--speech-bubble--inject-41.svg",revision:"32759d0b25dc0c1a4442757ae931a1f2"},{url:"/pagesgraphics/school/profile/ProfileGirlimg.svg",revision:"7d32d4a0af85867172426270deb34eeb"},{url:"/pagesgraphics/student/assignmentupload/folderpink.svg",revision:"f92ab373095296af3ba3eb3bdd45c8e6"},{url:"/pagesgraphics/student/assignmentupload/folderpinkarrow.svg",revision:"f8a8d8dcab010dd0f53d1aaa6efcfc60"},{url:"/pagesgraphics/student/coursedescription/ChartBar.svg",revision:"7135ca4837044fc6590ff804ca0426e2"},{url:"/pagesgraphics/student/coursedescription/Ellipse_1.svg",revision:"0566e014ce1a27bf63b7e1ed2f9b946c"},{url:"/pagesgraphics/student/coursedescription/Globe.svg",revision:"182c4e4aac5e1d55ca0becf71e1ac873"},{url:"/pagesgraphics/student/coursedescription/Group_30.svg",revision:"efb7272b8ad99136c584ecf324394b35"},{url:"/pagesgraphics/student/coursedescription/Lap.svg",revision:"dc590b920c498d939560232715db5e7a"},{url:"/pagesgraphics/student/coursedescription/Male.svg",revision:"24add70b8856e30ffca1c9c199eece45"},{url:"/pagesgraphics/student/coursedescription/Programmer coding on laptop.svg",revision:"d770d66a20d96e5adaa2857471f3c9c8"},{url:"/pagesgraphics/student/coursedescription/Smiley.svg",revision:"11b3c2a8babb5255b79cbac5c8020c24"},{url:"/pagesgraphics/student/coursedescription/clock.svg",revision:"6705a038a73521975ba78f0dfea8fd27"},{url:"/pagesgraphics/student/coursedescription/laptop.svg",revision:"208e84aac4216db1741e5f342681d814"},{url:"/pagesgraphics/student/coursedescription/tick.svg",revision:"368d38d7ad62ede30cede402e176c96d"},{url:"/pagesgraphics/student/details/ProfileGirlimg.svg",revision:"7d32d4a0af85867172426270deb34eeb"},{url:"/pagesgraphics/student/details/Programmercodingonlaptop.svg",revision:"d770d66a20d96e5adaa2857471f3c9c8"},{url:"/pagesgraphics/student/payment/GroupPayment.svg",revision:"9135897cc363c7fabfe5abd0998a8911"},{url:"/pagesgraphics/student/payment/bhim.png",revision:"a0e03bef6890cbe375f7f029d0bdcf92"},{url:"/pagesgraphics/student/payment/card.png",revision:"8fb194874f1f82d4f050c9706b09d77d"},{url:"/pagesgraphics/student/payment/upi.png",revision:"6c98a9beaf0528a3a3849b3841bc40e9"},{url:"/pagesgraphics/student/profilecontinue/Neatskills.svg",revision:"0f9c828a11b54b0338ab3594a7e9a32e"},{url:"/pagesgraphics/student/profilecontinue/businessexplaintowomen.svg",revision:"3009910428be401ca3d47e7237b58eda"},{url:"/pagesgraphics/student/videoplayback/Group 11.svg",revision:"6d0bfb4715c47be3e8c018d8184899d4"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

