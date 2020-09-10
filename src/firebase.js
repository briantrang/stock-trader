import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYACdm0Fk5mEbMixspoWWEPMvMpJ3Cf2w",
  authDomain: "vue-stock-trading-c1d4b.firebaseapp.com",
  databaseURL: "https://vue-stock-trading-c1d4b.firebaseio.com",
  projectId: "vue-stock-trading-c1d4b",
  storageBucket: "vue-stock-trading-c1d4b.appspot.com",
  messagingSenderId: "276982511026",
  appId: "1:276982511026:web:02772c8935d4b14320a0ab",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;
