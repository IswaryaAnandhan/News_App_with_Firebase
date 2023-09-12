import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "process.env.REACT_APP_FIREBASE_KEY",
    authDomain: "news-app-e6088.firebaseapp.com",
    projectId: "news-app-e6088",
    storageBucket: "news-app-e6088.appspot.com",
    messagingSenderId: "process.env.REACT_APP_MESSAGE_SENDER_ID",
    appId: "process.env.REACT_APP_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();