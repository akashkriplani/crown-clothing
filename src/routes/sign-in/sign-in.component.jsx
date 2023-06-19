import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  createUserDocumentFromAuth(user);
};

const SignIn = () => {
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
