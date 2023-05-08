import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCSFRQatNzPOntpPqFBlyxzIR9wld2F5as',
  authDomain: 'jureleutilities.firebaseapp.com',
  projectId: 'jureleutilities',
  storageBucket: 'jureleutilities.appspot.com',
  messagingSenderId: '1085474102736',
  appId: '1:1085474102736:web:4b5406faa9a8383aa3edd5',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
