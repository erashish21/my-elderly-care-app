import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyA7G2bSJTvN2zz5l7CaoWA0WLQWV-Qyfjc",
  authDomain: "my-elderly-care-app-e6460.firebaseapp.com",
  projectId: "my-elderly-care-app-e6460",
  storageBucket: "my-elderly-care-app-e6460.appspot.com",
  messagingSenderId: "918840444227",
  appId: "1:918840444227:web:e8d1e2b4e550000bec1bf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
