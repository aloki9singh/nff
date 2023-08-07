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
  
  
  try {


    const amount = body.amount;
    const prividerRefId = body.providerReferenceId;
    const transactionId = body.transactionId;
    const result = body.code;
    
    const currentDate = new Date();
    const futureDate = new Date();
    let plan;
    
    
    if (result == "PAYMENT_SUCCESS") {
      
      console.log("callback");
      if (amount == 29900) {

        futureDate.setDate(currentDate.getDate() + 1 * 30);
        plan = 1;
      }


      else if (amount == 89900) {
        futureDate.setDate(currentDate.getDate() + 6 * 30);
        plan = 6;

      }

      else if (amount == 359900) {
        futureDate.setDate(currentDate.getDate() + 12 * 30);
        plan = 12;
      }

      const validityData = {
        trial: {
          trialStartDate: currentDate,
          trialEndDate: futureDate,
        },
        courseAccess: true,
      };


      // searching if user exists or not
      const userRef = doc(db, "allusers", param1);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        // exist condition update the doc
        await updateDoc(userRef, validityData);


      }


      await setDoc(doc(db, "allusers", param1, "PlanInfo", transactionId), {
        id: param1,
        amount: amount,
        providerRefId: prividerRefId,
        transactionId: transactionId,
        paymentResult: result,
        plan: plan,
        paymentAt: new Date(),
      });


      const payload = encodeToBase64(JSON.stringify({
        amount: amount,
        providerRefId: prividerRefId,
        transactionId: transactionId,
        paymentResult: result,
        plan: plan,
        page:2,
      }));

      // res.status(302).redirect(baseUrl + '/beta/payment?val='+payload);
      res.setHeader('Location', baseUrl + '/beta/payment?val=' + payload);
      res.status(302).end();
    }
    else {
      console.log("body", body);
      // res.status(302).redirect(baseUrl + '/beta/paymentFailed')
      res.setHeader('Location', baseUrl + '/beta/paymentFailed');
      res.status(302).end();
    }

  } catch (error) {
    console.log(error);
    res.setHeader('Location', baseUrl + '/beta/paymentFailed');
    res.status(302).end();

    // res.status(302).redirect(baseUrl+'/beta/payment');
  }
}


export default handler;