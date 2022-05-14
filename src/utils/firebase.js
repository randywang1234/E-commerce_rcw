// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
  const API_KEY = process.env.REACT_APP_API_KEY
  const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
  const SENDER_ID = process.env.REACT_APP_SENDER_ID
  const APP_ID = process.env.REACT_APP_APP_ID

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: `${AUTH_DOMAIN}.firebaseapp.com`,
  projectId: `${AUTH_DOMAIN}`,
  storageBucket: `${AUTH_DOMAIN}.appspot.com`,
  messagingSenderId: `${SENDER_ID}`,
  appId: `${APP_ID}`
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase