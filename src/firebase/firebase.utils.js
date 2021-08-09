import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgm2ZhhEPQQwyoq2wGr-iK75D1UQ6hYt0",
    authDomain: "crwn-db-6ddf4.firebaseapp.com",
    projectId: "crwn-db-6ddf4",
    storageBucket: "crwn-db-6ddf4.appspot.com",
    messagingSenderId: "773651481530",
    appId: "1:773651481530:web:a45e6ca665ec9798265383",
    measurementId: "G-ZEE9Q5PKPY"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
