// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3x9L_7_GrOtQVU7zC7shAB00lj_He3Uw",
  authDomain: "netflixgptnew-1582a.firebaseapp.com",
  projectId: "netflixgptnew-1582a",
  storageBucket: "netflixgptnew-1582a.appspot.com",
  messagingSenderId: "385757800050",
  appId: "1:385757800050:web:b6c34ae8f650959e4404eb",
  measurementId: "G-1Z64N54VN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();