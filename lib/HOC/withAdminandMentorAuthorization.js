import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

const withAdminandMentorAuthorization = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { loading, userProfile } = useAuthContext();
    const router = useRouter();

    if (loading || !userProfile) {
      router.push("/reta/login");
      return null;
    }

    if (userProfile.role == "admin" || userProfile.role == "mentor") {
      return <WrappedComponent {...props} />;
    } else {
      // if (userProfile.role !== 'admin' || !userProfile.isVerified) {
      router.replace("/"); // Redirect to the home page if not verified or not an admin
      return null;
    }
  };

  return Wrapper;
};

export default withAdminandMentorAuthorization;
