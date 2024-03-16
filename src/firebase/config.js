import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// const firebaseConfig = {
//     apiKey: "AIzaSyCggZCcBun0cwNfOWGC2K8pZcgIRWMfqwY",
//     authDomain: "olx-sijeesh.firebaseapp.com",
//     projectId: "olx-sijeesh",
//     storageBucket: "olx-sijeesh.appspot.com",
//     messagingSenderId: "767411886432",
//     appId: "1:767411886432:web:2ef6862afc88f2c423a605",
//     measurementId: "G-4ELNR9DJHL"
//   };

  
// ...................................................................................................................
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkhad-79MnAwcLp96-7Mhm6MYtGprb53M",
  authDomain: "sellease-3e53f.firebaseapp.com",
  projectId: "sellease-3e53f",
  storageBucket: "sellease-3e53f.appspot.com",
  messagingSenderId: "335759929957",
  appId: "1:335759929957:web:bcbea73edd1614df8bcc8c",
  measurementId: "G-WCJE51M23H"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const Firebase= firebase.initializeApp(firebaseConfig)//named export