// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Get elements
const prescriptionForm = document.querySelector("#prescription-form");
const prescriptionList = document.querySelector("#prescription-list");

// Handle form submit
prescriptionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const ailment = prescriptionForm["ailment"].value;
  const name = prescriptionForm["name"].value;
  const age = prescriptionForm["age"].value;
  const email = prescriptionForm["email"].value;
  const phone = prescriptionForm["phone"].value;

  // Save prescription to Firebase Firestore
  createUserWithEmailAndPassword(auth, email, phone)
    .then((userCredential) => {
      const user = userCredential.user;
      db.collection("prescriptions").add({
        ailment: ailment,
        name: name,
        age: age,
        email: email,
        phone: phone,
        userId: user.uid,
      })
      .then(() => {
        console.log("Prescription added to Firestore");
        prescriptionForm.reset();
      })
      .catch((error) => {
        console.error("Error adding prescription to Firestore: ", error);
      });
    })
    .catch((error) => {
      console.error("Error creating user in Firebase Auth: ", error);
    });
});

// Display prescriptions from Firebase Firestore
db.collection("prescriptions")
  .orderBy("ailment")
  .onSnapshot((querySnapshot) => {
    prescriptionList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const prescription = doc.data();
      prescription.id = doc.id;
      const prescriptionItem = `
        <li>
          <span>${prescription.ailment}</span>
          <span>${prescription.name}</span>
          <span>${prescription.age}</span>
          <span>${prescription.email}</span>
          <span>${prescription.phone}</span>
          <button class="delete-btn" data-id="${prescription.id}">Delete</button>
        </li>
      `;
      prescriptionList.innerHTML += prescriptionItem;
    });

    // Handle delete button click
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const prescriptionId = e.target.dataset.id;
        db.collection("prescriptions").doc(prescriptionId).delete()
          .then(() => {
            console.log("Prescription deleted from Firestore");
          })
          .catch((error) => {
            console.error("Error deleting prescription from Firestore: ", error);
          });
      });
    });
  });
