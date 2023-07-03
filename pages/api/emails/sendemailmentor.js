import { transporter } from "@/config/nodemailer";

export default async function sendEmailMentor(req, res) {
    const data = req.body;
   
    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Welcome to NeatSkills',
        text: `<p>Welcome, ${data.displayName}! Thank you for signing up to NeatSkills.</p>`,
        html: `<p>Welcome, ${data.displayName}! Thank you for signing up to NeatSkills.</p>`,
      });
      console.log('Welcome email sent successfully!', data);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      res.status(500).json({ success: false });
    }
  }
  
  //this is to send email as successfull welcome to app



  