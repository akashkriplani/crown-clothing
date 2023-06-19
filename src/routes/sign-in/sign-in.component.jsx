import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const logGoogleUser = async () => {
  const response = await signInWithGooglePopup();
  console.log(response);
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
