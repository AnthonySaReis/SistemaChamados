import firebase from 'firebase/app';
import 'firebase/auth';
import  { collection, query, where } from 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyCBDkiA_bzbLqzK4BJMGzQtU4KFbtGjxuk",
  authDomain: "sistema-b4d64.firebaseapp.com",
  projectId: "sistema-b4d64",
  storageBucket: "sistema-b4d64.appspot.com",
  messagingSenderId: "734056477666",
  appId: "1:734056477666:web:acd9e6041c55b9b0b17fbb",
  measurementId: "G-14QVTW7LDG"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;