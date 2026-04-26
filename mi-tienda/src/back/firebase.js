// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5SilrxeTaosB4oO-fF20yMabcqP7pyhI",
    authDomain: "dev-fullsack.firebaseapp.com",
    projectId: "dev-fullsack",
    storageBucket: "dev-fullsack.firebasestorage.app",
    messagingSenderId: "122888215417",
    appId: "1:122888215417:web:a2142fe0d3f119496beda8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);