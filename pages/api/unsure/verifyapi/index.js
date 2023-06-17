import {adminAuth} from '../../components/config/firebaseAdminConfig'
const verifyApi = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const email = req.body.email;
      const temp = await adminAuth.getUserByEmail(email);
      await adminAuth.updateUser(temp.uid, { emailVerified: true });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating email verification status:', error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(400).json({ error: 'Invalid request method' });
  }
};
export default verifyApi;
