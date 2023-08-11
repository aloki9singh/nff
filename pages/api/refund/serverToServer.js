//Yet to work on Update Plan Logic, this will fail on Update Plan!!!!

import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';


function encodeToBase64(str) {
  return btoa(str);
}


async function handler(req, res) {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { param1 } = req.query;
  const body = req.body;
  const headers = req.headers;


  try {

console.log(body, param1,headers);

  } catch (error) {

    // const payload = encodeToBase64(JSON.stringify(error));
    res.setHeader('Location', baseUrl + '/beta/paymentFailed?val=' + payload);
    res.status(302).end();

    // res.status(302).redirect(baseUrl+'/beta/payment');
  }
}


export default handler;