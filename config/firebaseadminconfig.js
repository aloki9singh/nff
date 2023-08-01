var admin = require("firebase-admin");

var serviceAccount = require("./serviceaccountkey");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://neatskill-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}
export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage();


//here used service Accountkey  file will be changed on changing firebase config
// you have to generate it from fire base  in json format from your project and put it here
