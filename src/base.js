import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB_LoiOpjb3wLufdorJPhFnRpI1tdHRJ48",
    authDomain: "catch-of-the-day-james-gemes.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-james-gemes-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-james-gemes",
    storageBucket: "catch-of-the-day-james-gemes.appspot.com",
    messagingSenderId: "580921642015",
    appId: "1:580921642015:web:d147fd6d61cebc6565192a",
    measurementId: "G-4RFNY42V9V"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;