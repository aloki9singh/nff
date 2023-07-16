import { useRouter } from 'next/router';
import { useAuthContext } from 'path/to/AuthContext';

const withStudentAuthorization = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { loading, userProfile } = useAuthContext();
    const router = useRouter();

    if (loading || !userProfile) {
      router.replace('/login');
      return null;
    }

    if (userProfile.role !== 'student' || !userProfile.isVerified) {
      router.replace('/'); // Redirect to the home page if not verified or not a student
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withStudentAuthorization;
