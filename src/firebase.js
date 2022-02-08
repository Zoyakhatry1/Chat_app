import firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB1Oer2_atWLKBj15jQ-0KAEJjP6QqVFcE",
    authDomain: "chat-app-ec21a.firebaseapp.com",
    projectId: "chat-app-ec21a",
    storageBucket: "chat-app-ec21a.appspot.com",
    messagingSenderId: "965485635037",
    appId: "1:965485635037:web:0f4e5775ceb56e7bd30234"
  };
export const app = initializeApp(firebaseConfig);