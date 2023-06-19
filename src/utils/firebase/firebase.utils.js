import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-p-6Q4pajmK6nVRIroPwczr8Fng6euow',
  authDomain: 'crown-cloth-db-10436.firebaseapp.com',
  projectId: 'crown-cloth-db-10436',
  storageBucket: 'crown-cloth-db-10436.appspot.com',
  messagingSenderId: '673286158406',
  appId: '1:673286158406:web:566436e2e02b867246b247'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);

  console.log(userSnapshot.exists());
};
