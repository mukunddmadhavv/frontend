
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLT9zJbDl04ZLqrIRjYBLnYUjeNtXymeE",
  authDomain: "track-now-8838a.firebaseapp.com",
  projectId: "track-now-8838a",
  storageBucket: "track-now-8838a.appspot.com",
  messagingSenderId: "666156752670",
  appId: "1:666156752670:web:289a7b005602fa1874f30f",
  measurementId: "G-LGBJGTWL32"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
