import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAByG9pFlnUX9Yyqpw1ytDYWDd1rEsXRyA',
  authDomain: 'nanalil.firebaseapp.com',
  databaseURL: 'https://nanalil.firebaseio.com',
  projectId: 'nanalil',
  storageBucket: 'nanalil.appspot.com',
  messagingSenderId: '854732109100',
  appId: '1:854732109100:web:70878a130e1a247c7ce889',
  measurementId: 'G-E4D3QBTWDW',
};

const app = initializeApp(firebaseConfig);

export const fireStoreDB = getFirestore(app);

export const auth = getAuth(app);