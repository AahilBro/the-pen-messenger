import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your Firebase config - replace with your own config here!
const firebaseConfig = {
  apiKey: "AIzaSyA6gEtbj57EtyiQSHcdumvn3atdm9m9Uns",
  authDomain: "the-pen-website.firebaseapp.com",
  projectId: "the-pen-website",
  storageBucket: "the-pen-website.firebasestorage.app",
  messagingSenderId: "166649047755",
  appId: "1:166649047755:web:5c8ba74e91be6d288dc94e",
  measurementId: "G-PLX803BF42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const loginBtn = document.getElementById("login-btn");
const appDiv = document.getElementById("app");

loginBtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch(console.error);
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User logged in
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // First time login, save displayName as penName
      await setDoc(userRef, {
        displayName: user.displayName,
        penName: user.displayName,
        photoURL: user.photoURL
      });
    }

    // Show chat welcome UI
    showWelcome(user.displayName);
  } else {
    // User logged out
    showLogin();
  }
});

function showLogin() {
  appDiv.innerHTML = `
    <button id="login-btn">Login with Google</button>
  `;
  document.getElementById("login-btn").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(console.error);
  });
}

function showWelcome(penName) {
  appDiv.innerHTML = `
    <div id="welcome-msg">Welcome, <b>${penName}</b>!</div>
    <button id="logout-btn">Logout</button>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth);
  });
}
