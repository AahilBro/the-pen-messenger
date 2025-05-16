import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  // your config here
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const appDiv = document.getElementById("app");

function showLogin() {
  appDiv.innerHTML = `<button id="login-btn">Login with Google</button>`;
  document.getElementById("login-btn").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(console.error);
  });
}

async function showWelcome(user) {
  // Check Firestore if user data exists
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Save the Google displayName as penName for first login
    await setDoc(userRef, {
      displayName: user.displayName,
      penName: user.displayName,
      photoURL: user.photoURL || null,
    });
  }

  // Show welcome UI with penName
  const penName = userSnap.exists() ? userSnap.data().penName : user.displayName;

  appDiv.innerHTML = `
    <div id="welcome-msg">Welcome, <b>${penName}</b>!</div>
    <button id="logout-btn">Logout</button>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth);
  });
}

// This triggers on login/logout state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User logged in — show pen name welcome
    showWelcome(user);
  } else {
    // User logged out — show login button
    showLogin();
  }
});

// Show login at first load
showLogin();
