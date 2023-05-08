import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from 'reactfire';

const LoginPage = () => {
  const auth = useAuth();
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [auth.providers.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div className="container login-page">
      <h2>Login</h2>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default LoginPage;
