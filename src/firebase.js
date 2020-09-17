// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import * as firebase from "firebase";
// import "firebase/firestore";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAtpYlLzAUcQFau5jNxArDcZu9TJKVLD-Q",
  authDomain: "instagram-react-clone-3ce32.firebaseapp.com",
  databaseURL: "https://instagram-react-clone-3ce32.firebaseio.com",
  projectId: "instagram-react-clone-3ce32",
  storageBucket: "instagram-react-clone-3ce32.appspot.com",
  messagingSenderId: "526717216949",
  appId: "1:526717216949:web:33e7e9e664bedbc063f6fc",
  measurementId: "G-KKTSGG498N",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
