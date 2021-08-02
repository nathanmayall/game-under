import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAJGHuqIbOg-fzCW4nhwo18hAWipO06HTc",
  authDomain: "gameunder.firebaseapp.com",
  projectId: "gameunder",
  storageBucket: "gameunder.appspot.com",
  messagingSenderId: "793075445524",
  appId: "1:793075445524:web:0baf04d553a8ad34c09c01",
  measurementId: "G-ZW476XVBL0",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fireStore = firebase.firestore();

export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = fireStore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, uid, photoURL, displayName } = user;
    try {
      userRef.set({
        displayName,
        email,
        photoURL,
        uid,
        createdAt: new Date(),
      });
    } catch (err) {
      console.log("Error creating user: ", err);
    }
  }
  return;
};
