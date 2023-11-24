// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'mern-auth-86686.firebaseapp.com',
    projectId: 'mern-auth-86686',
    storageBucket: 'mern-auth-86686.appspot.com',
    messagingSenderId: '1062021174334',
    appId: '1:1062021174334:web:860433a88151eb01c8ed6f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
