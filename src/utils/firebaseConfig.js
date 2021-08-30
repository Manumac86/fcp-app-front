import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAg7JDlTtf3SEubEuza4HLkfDLvL8e7DSU',
  authDomain: 'fcp-app-admin.firebaseapp.com',
  databaseURL: 'https://fcp-app-admin-default-rtdb.firebaseio.com',
  projectId: 'fcp-app-admin',
  storageBucket: 'fcp-app-admin.appspot.com',
  messagingSenderId: '656367045938',
  appId: '1:656367045938:web:d93bfc7e891a29fca11b2b',
  measurementId: 'G-CZC454PKNV',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// Using a popup.
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

// collection references
const usersCollection = db.collection('users');
const videosCollection = db.collection('videos');
const contestsCollection = db.collection('contests');

// export utils/refs
export {
  auth,
  provider,
  usersCollection,
  videosCollection,
  contestsCollection,
};
