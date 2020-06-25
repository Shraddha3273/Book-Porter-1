import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBdPU0zZDG7SBljfmNW3ivQbUAIgEqaa9A",
  authDomain: "book-porter-1.firebaseapp.com",
  databaseURL: "https://book-porter-1.firebaseio.com",
  projectId: "book-porter-1",
  storageBucket: "book-porter-1.appspot.com",
  messagingSenderId: "924664108802",
  appId: "1:924664108802:web:b61054f091c923744f941b"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
