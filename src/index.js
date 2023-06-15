const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    // Add your Firebase config object here
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
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

  
  // Get a reference to the prescription form
  const form = document.getElementById("prescription-form");
  
  // Handle form submission
  form.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the values of the form fields
    const ailment = form.elements["ailment"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    const email = form.elements["email"].value;
    const phone = form.elements["phone"].value;
  
    // Add a new document to the "prescriptions" collection in Firestore
    db.collection("prescriptions").add({
      ailment: ailment,
      name: name,
      age: age,
      email: email,
      phone: phone,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // Reset the form after successful submission
        form.reset();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
  