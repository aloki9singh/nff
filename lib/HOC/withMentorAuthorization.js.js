import { useRouter } from 'next/router';
import { useAuthContext } from "../context/AuthContext";

const withMentorAuthorization = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { loading, userProfile } = useAuthContext();
    const router = useRouter();

    if (loading || !userProfile) {
      router.replace('/beta/login');
      return null;
    }

    if (userProfile.role !== 'mentor') {
    // if (userProfile.role !== 'mentor' || !userProfile.isVerified) {
      router.replace('/'); // Redirect to the home page if not verified or not a mentor
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withMentorAuthorization;
