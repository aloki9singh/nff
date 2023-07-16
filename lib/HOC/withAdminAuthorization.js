import { useRouter } from 'next/router';
import { useAuthContext } from "../context/AuthContext";

const withAdminAuthorization = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { loading, userProfile } = useAuthContext();
    const router = useRouter();

    if (loading || !userProfile) {
      router.replace('reta/login');
      return null;
    }

    if (userProfile.role !== 'admin') {
    // if (userProfile.role !== 'admin' || !userProfile.isVerified) {
      router.replace('/'); // Redirect to the home page if not verified or not an admin
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdminAuthorization;
