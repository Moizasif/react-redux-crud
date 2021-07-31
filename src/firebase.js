import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAzZTQWBFnd7cdzuak_qTTeGUB-PCOsonY",
    authDomain: "redux-contact-415fc.firebaseapp.com",
    projectId: "redux-contact-415fc",
    storageBucket: "redux-contact-415fc.appspot.com",
    messagingSenderId: "785612748690",
    appId: "1:785612748690:web:a9683fe9bab123ceea734b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;