import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {API_KEY, AUTH_DOMAIN, DATEBASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDRER_ID, APP_ID, MEASUREMENT_ID} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATEBASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDRER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const fireStoreDB = getFirestore(app);

export const auth = getAuth(app);