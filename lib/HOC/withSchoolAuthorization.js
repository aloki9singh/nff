import { useRouter } from 'next/router';
import { useAuthContext } from "../context/AuthContext";

const withSchoolAuthorization = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { loading, userProfile } = useAuthContext();
    const router = useRouter();

    if (loading || !userProfile) {
      router.replace('/seta/login');
      return null;
    }

    if (userProfile.role !== 'school' ) {
    // if (userProfile.role !== 'school' || !userProfile.isVerified) {
      router.replace('/'); // Redirect to the home page if not verified or not a school
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withSchoolAuthorization;
