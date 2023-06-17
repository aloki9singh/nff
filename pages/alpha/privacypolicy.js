import Sidebar from '../components/Sidebar/sidebar';
import Dashboardnav from '../components/Navbar/Dashboardnav';
import BottomNav from '../components/Footer/BottomNav';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-full flex flex-col bg-[#2D2E35] space-y-4">
        <Dashboardnav heading="Privacy policy" />
        <div className="flex justify-start items-center text-center text-white md:m-6 m-3">
          <h1 className="text-[#E1348B] font-semibold md:text-2xl text-xl">
            Last updated on 7th of May 2023
          </h1>
        </div>
        <div className="md:bg-[#373A41] rounded-[50px]">
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Privacy Policy
            </h1>
            <p>
              This Privacy Policy {`("Policy")`} governs the manner in which we
              collect, use, and disclose personal information on our skill
              development platform web-app “neatskills.tech” . This Policy is a
              legally binding agreement between you and us. By using our
              Platform, you agree to the collection, use, and disclosure of
              information in accordance with this Policy.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Collection of Information
            </h1>
            <p>
              We may collect personal information when you sign up for an
              account on our Platform, use our services, or communicate with us.
              The personal information we collect may include your name, email
              address, location, and any other information you provide to us. We
              may also collect non-personal information, such as your browser
              type and operating system, to improve our Platform and better
              understand our {`users'`} needs.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Use of Information
            </h1>
            <p></p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl"></h1>
            <p></p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl"></h1>
            <p></p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl"></h1>
            <p>
              We may use your personal information to provide and improve our
              services, personalize your experience, and communicate with you.
              We may also use non-personal information to improve our Platform
              and better understand our {`users'`} needs.
            </p>
            <p>
              We may use cookies and other tracking technologies to collect
              information about your activities on our Platform and to
              personalize your experience. You can disable cookies in your
              browser settings, but this may limit your ability to use certain
              features of our Platform.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Disclosure of Information
            </h1>
            <p>
              We may disclose your personal information to third-party service
              providers who help us operate our Platform and provide services to
              you. These service providers are contractually obligated to
              maintain the confidentiality of your information and are
              prohibited from using it for any other purpose.
            </p>
            <p>
              We may also disclose your personal information if required by law
              or in connection with a legal proceeding.
            </p>
            <p>
              We may disclose aggregated and de-identified information that does
              not identify you to third parties for any purpose, including
              marketing and advertising.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">Security</h1>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure. We use
              industry-standard security technologies and procedures to protect
              your personal information. However, no security system is perfect,
              and we cannot guarantee the security of your information.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              {`Children's`} Privacy
            </h1>
            <p>
              Our Platform is not intended for use by children under the age of
              13 without parental/guardian guidance. We do not knowingly collect
              personal information from children under the age of 13. If we
              become aware that we have collected personal information from a
              child under the age of 13, we will take steps to delete it as soon
              as possible.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Retention of Information
            </h1>
            <p>
              We retain your personal information for as long as necessary to
              provide you with our services and to comply with our legal
              obligations. We may also retain your personal information to
              resolve disputes, enforce our agreements, and for other legitimate
              business purposes.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">Your Rights</h1>
            <p>
              You have the right to access, rectify, or delete your personal
              information that we hold. You also have the right to object to or
              restrict our processing of your personal information. To exercise
              these rights, please contact us at [insert contact information].
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Marketing Communications
            </h1>
            <p>
              We may send you marketing communications about our products and
              services. You can opt-out of receiving these communications by
              following the unsubscribe instructions in the communication or by
              contacting us at &nbsp;
              <span className="font-semibold">
                <Link href="mailto:support@neatskills.tech">
                  support@neatskills.tech
                </Link>
              </span>
              .
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <h1 className="font-semibold md:text-4xl text-2xl">
              Changes to this Policy
            </h1>
            <p>
              We may update this Policy from time to time. We will notify you of
              any changes by posting the new policy on our Platform. You are
              advised to review this Policy periodically for any changes.
            </p>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </div>
  );
}
