
//main body CSS and nav bar needed to be fixed with responsiveness



import Sidebar from '@/components/common/sidebar/sidebar';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import Footer from '@/components/common/footer/footer';
import BottomNav from "@/components/common/footer/bottomnav";

export default function Terms() {
  return (
    <div className="flex">
     <div className="lg:col-span-1 hidden lg:grid">
        <Sidebar />
      </div>
      <div className="w-full h-full flex flex-col bg-[#2D2E35] space-y-4">
        <Dashboardnav heading="Terms and conditions" />
        <div className="flex justify-start items-center text-center text-white md:m-6 m-3">
          <h1 className="text-[#E1348B] font-semibold md:text-2xl text-xl">
            Last updated on 7th of May 2023
          </h1>
        </div>
        <div className="md:bg-[#373A41] rounded-[50px]">
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Terms and Conditions for neatskills.tech
            </h1>
            <p>
              Welcome to our skill development platform “neatskills.tech”. These
              terms and conditions {`("Terms")`} govern your use of our web-app
              and the services we offer. By accessing or using our web-app, you
              agree to be bound by these Terms. If you do not agree to these
              Terms, you may not use our web-app.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              1. Use of the Web-App
            </h1>
            <p>
              1.1. Our skill development platform web-app is designed to provide
              users with access to courses and other learning resources to
              enhance their skills. You agree to use our web-app only for lawful
              purposes and in accordance with these Terms. You may not use our
              web app for any illegal or unauthorized purpose or engage in any
              activity that violates these Terms.
            </p>
            <p>
              1.2. By using our web-app, you represent and warrant that you have
              the legal capacity to enter into these Terms.
            </p>
            <p>
              1.3. We reserve the right to modify, suspend, or discontinue any
              part of our web-app at any time without prior notice or liability.
            </p>
            <p>
              1.4. You are solely responsible for obtaining and maintaining any
              equipment or ancillary services necessary to access and use our
              web-app, including without limitation, internet access, hardware,
              software, and telecommunications equipment.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              2. User Account
            </h1>
            <p>
              2.1. To use certain features of our web app, you may need to
              create a user account. When you create a user account, you agree
              to provide accurate and complete information about yourself. You
              are responsible for maintaining the confidentiality of your
              account login credentials and for all activities that occur under
              your account.
            </p>
            <p>
              2.2. You agree to notify us immediately of any unauthorized use of
              your account or any other breach of security. We will not be
              liable for any loss or damage arising from your failure to comply
              with this provision.
            </p>
            <p>
              2.3. We reserve the right to terminate your account at any time
              and for any reason, in our sole discretion, without notice or
              liability.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              3. Payment and Fees
            </h1>
            <p>
              3.1. Certain features and services on our web app may require
              payment of fees. By using these features and services, you agree
              to pay all applicable fees and charges. All fees are
              non-refundable unless otherwise stated.
            </p>
            <p>
              3.2. You are solely responsible for all charges incurred under
              your account, including but not limited to applicable taxes, and
              you agree to pay such charges in accordance with the billing terms
              in effect at the time the charge was incurred.
            </p>
            <p>
              3.3. We reserve the right to modify our fees and billing methods
              at any time, with or without notice. If you do not agree to any
              such changes, your sole remedy is to terminate your account.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              4. Intellectual Property Rights
            </h1>
            <p>
              4.1. Our web-app and its entire contents, features, and
              functionality (including but not limited to all information,
              software, text, displays, images, video, and audio) are owned by
              us or our licensors and are protected by copyright, trademark, and
              other intellectual property rights.
            </p>
            <p>
              4.2. You acknowledge and agree that our web-app and its contents
              are provided for your personal, non-commercial use only. You may
              not copy, reproduce, distribute, transmit, display, perform,
              modify, or create derivative works of any portion of our web-app
              without our prior written consent.
            </p>
            <p>
              4.3. You may not use any automated system or software to extract
              data from our web app for commercial purposes (screen scraping),
              nor may you attempt to interfere with the proper working of our
              web-app.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              5. User Content
            </h1>
            <p>
              5.1. Our web app allows users to submit and share content,
              including but not limited to course reviews and comments. By
              submitting content, you grant us a non-exclusive, transferable,
              sub-licensable, royalty-free, worldwide license to use
            </p>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </div>
  );
}
