import * as firebase from 'firebase'

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCog8N3lMiPdYsf2CWu7mV0NLdhFpP3wEc",
    authDomain: "test-geofence-439ed.firebaseapp.com",
    projectId: "test-geofence-439ed",
    storageBucket: "test-geofence-439ed.appspot.com",
    messagingSenderId: "511820577972",
    appId: "1:511820577972:web:34f2af8633017a46492be1",
    measurementId: "G-SRP83SPPP2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();

export {database as default}