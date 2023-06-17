import Sidebar from '../components/Sidebar/sidebar';
import Dashboardnav from '../components/Navbar/Dashboardnav';
import BottomNav from '../components/Footer/BottomNav';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';

export default function Return() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-full flex flex-col bg-[#2D2E35] space-y-4">
        <Dashboardnav heading="Return and refund policy" />
        <div className="flex justify-start items-center text-center text-white md:m-6 m-3">
          <h1 className="text-[#E1348B] font-semibold md:text-2xl text-xl">
            Last updated on 7th of May 2023
          </h1>
        </div>
        <div className="md:bg-[#373A41] rounded-[50px]">
          <div className="md:m-6 m-3 text-white space-y-4">
            <p className="font-semibold text-xl">
              Thank you for choosing our skill development platform web-app
              “neatskills.tech”. We understand that sometimes circumstances
              change and you may wish to cancel your subscription, request a
              refund or return our services. We want to ensure that our Refund
              and Return Policy is clear, transparent and in compliance with
              applicable laws.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Refund Policy:
              </span>
              &nbsp; We offer a 30-day money-back guarantee for all of our
              subscriptions. If you are not satisfied with our service, you may
              request a refund within 30 days of your purchase. To initiate a
              refund, please contact our support team at &nbsp;
              <span className="font-semibold">
                <Link href="mailto:support@neatskills.tech">
                  support@neatskills.tech
                </Link>
              </span>
              . Our support team will process your refund request within 5
              business days. Please note that refunds will be issued to the
              original payment method.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Exceptions:
              </span>
              &nbsp; We reserve the right to refuse refunds or returns for any
              reason at our discretion. Refunds may be denied if you have
              violated our Terms of Service or if your refund request is
              fraudulent or made in bad faith. We do not offer refunds for
              promotional discounts, bundle purchases, or any other special
              offers that may be in effect from time to time. Additionally, we
              do not offer refunds or returns for any services rendered during a
              trial or free period.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Return Policy:
              </span>
              &nbsp; As a web-app, we do not offer a physical product that can
              be returned. However, if you encounter any technical issues while
              using our platform, please contact our support team at &nbsp;
              <span className="font-semibold">
                <Link href="mailto:support@neatskills.tech">
                  support@neatskills.tech
                </Link>
              </span>
              . Our team will work with you to resolve the issue and provide any
              necessary technical support.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Cancellation Policy:
              </span>
              &nbsp; You may cancel your subscription at any time. If you choose
              to cancel, your subscription will remain active until the end of
              your current billing period. No refunds will be issued for any
              unused portion of your subscription.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Legal Disclaimers:
              </span>
              &nbsp; We make no warranties, express or implied, with respect to
              our services, including but not limited to any implied warranties
              of merchantability or fitness for a particular purpose. In no
              event shall we be liable for any damages arising out of or in
              connection with the use or inability to use our services.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Governing Law:
              </span>
              &nbsp; This Refund and Return Policy shall be governed by and
              construed in accordance with the laws of the jurisdiction in which
              we are headquartered, without regard to its conflicts of law
              provisions.
            </p>
          </div>
          <div className="md:m-6 m-3 text-white space-y-4">
            <p>
              <span className="font-semibold md:text-4xl text-2xl">
                Changes to Policy:
              </span>
              &nbsp; We reserve the right to update or change our Refund and
              Return Policy at any time. We will notify you of any changes by
              posting the new policy on our website. It is your responsibility
              to review this policy periodically for any changes.
            </p>
            <p>
              If you have any questions or concerns about our Refund and Return
              Policy, please contact our support team at &nbsp;
              <span className="font-semibold">
                <Link href="mailto:support@skilldevelopmentplatform.com">
                  support@skilldevelopmentplatform.com
                </Link>
              </span>
              . We are always here to help.
            </p>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </div>
  );
}
