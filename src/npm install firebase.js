npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGrxD6cShjrMVu8vjI_6roCKCnw7vtqtA",
  authDomain: "pharmapp-91a79.firebaseapp.com",
  databaseURL: "https://pharmapp-91a79-default-rtdb.firebaseio.com",
  projectId: "pharmapp-91a79",
  storageBucket: "pharmapp-91a79.appspot.com",
  messagingSenderId: "126931696736",
  appId: "1:126931696736:web:a11a9487160c7d0aad9705",
  measurementId: "G-R1552DQLXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);