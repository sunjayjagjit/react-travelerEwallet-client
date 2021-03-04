//import * as firebase from "firebase";

import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzzpiCllTLkcMZ8gH7GghHU5SghlRtUPY",
    authDomain: "travelerewallet.firebaseapp.com",
    databaseURL: "https://travelerewallet.firebaseio.com",
    projectId: "travelerewallet",
    storageBucket: "travelerewallet.appspot.com",
    messagingSenderId: "223701407178",
    appId: "1:223701407178:web:b749f287071912cecdeb33"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export  default firebase
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();