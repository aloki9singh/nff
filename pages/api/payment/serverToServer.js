
import {doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

async function handler(req, res) {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
      const {param1} = req.query;
      const body = req.body;
      console.log("callback") ;
      
      
      try {
        
        
        const amount = body.amount;
        const prividerRefId = body.providerReferenceId;
        const transactionId = body.transactionId;
        const result = body.code;

        const currentDate = new Date();
        const futureDate = new Date();
        let plan;


        console.log(result == "PAYMENT_SUCCESS" );
        
        if(amount == 29900){
          futureDate.setDate(currentDate.getDate() + 1 * 30);
          plan = 1;
        }


        else if(amount == 89900){
          futureDate.setDate(currentDate.getDate() + 6 * 30);
          plan = 6;

        }

        else if(amount == 359900){
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
          providerRefId : prividerRefId,
          transactionId :transactionId,
          paymentResult:result,
          plan:plan,
          paymentAt: new Date(),
        });

        console.log(body, param1);
        res.status(302).redirect(baseUrl+'/beta/payment');

      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
        // res.status(302).redirect(baseUrl+'/beta/payment');
      }
    }


    export default handler;