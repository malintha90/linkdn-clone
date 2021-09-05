// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
// import admin from 'firebase-admin';

// admin.initializeApp(); 

const firebaseConfig = {
    apiKey: "AIzaSyCcOVps79FZ0zbKuOdCTM2cRRjx8IhC_lE",
    authDomain: "linkdin-clone-4676c.firebaseapp.com",
    projectId: "linkdin-clone-4676c",
    storageBucket: "linkdin-clone-4676c.appspot.com",
    messagingSenderId: "360599841",
    appId: "1:360599841:web:fc56be2c66c6117abe6e60",
    measurementId: "G-6W78SYT9VJ"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();
  // const adminAuth = admin.auth();

  export {db, auth, provider,storage};