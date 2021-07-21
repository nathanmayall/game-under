import firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAJGHuqIbOg-fzCW4nhwo18hAWipO06HTc",
  authDomain: "gameunder.firebaseapp.com",
  projectId: "gameunder",
  storageBucket: "gameunder.appspot.com",
  messagingSenderId: "793075445524",
  appId: "1:793075445524:web:0baf04d553a8ad34c09c01",
  measurementId: "G-ZW476XVBL0",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
