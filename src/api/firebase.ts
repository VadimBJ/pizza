// src/api/firebase.js
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBPtafXYvq7Bf9miY6ZWx-eNnvakVlSSmk',
  authDomain: 'vad-ts-firebase-555.firebaseapp.com',
  projectId: 'vad-ts-firebase-555',
  storageBucket: 'vad-ts-firebase-555.appspot.com',
  messagingSenderId: '447728422299',
  appId: '1:447728422299:web:c1df26c093191654f1653e'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
