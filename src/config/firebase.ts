// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkx-hTuVHHIsINOOhMTGLlg0i4HWeogQc",
  authDomain: "react-sample-app-751c0.firebaseapp.com",
  projectId: "react-sample-app-751c0",
  storageBucket: "react-sample-app-751c0.appspot.com",
  messagingSenderId: "382506682716",
  appId: "1:382506682716:web:c921f5b936a5f0ebc79999"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);