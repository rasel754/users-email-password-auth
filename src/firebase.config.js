// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcpVJEa62XhwB1CkqpvEnrSN0qYiYjLIA",
  authDomain: "users-email-password-aut-5febd.firebaseapp.com",
  projectId: "users-email-password-aut-5febd",
  storageBucket: "users-email-password-aut-5febd.appspot.com",
  messagingSenderId: "412894592911",
  appId: "1:412894592911:web:e379855732e5274f0015fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;