// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6gEtbj57EtyiQSHcdumvn3atdm9m9Uns",
  authDomain: "the-pen-website.firebaseapp.com",
  projectId: "the-pen-website",
  storageBucket: "the-pen-website.firebasestorage.app",
  messagingSenderId: "166649047755",
  appId: "1:166649047755:web:5c8ba74e91be6d288dc94e",
  measurementId: "G-PLX803BF42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
