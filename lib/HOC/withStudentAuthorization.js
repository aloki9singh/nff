import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

const withStudentAuthorization = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { loading, userProfile } = useAuthContext();
    const router = useRouter();

    if (loading || !userProfile) {
      router.replace("/beta/login");
      return null;
    }

    if (userProfile.role !== "student") {
    // if (userProfile.role !== "student"|| !userProfile.active) {
      // if (userProfile.role !== 'student' || !userProfile.isVerified) {
      router.replace("/"); // Redirect to the home page if not verified or not a student
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withStudentAuthorization;
