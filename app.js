import { auth, provider } from './firebase-config.js';
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("Logged in as " + user.displayName);
    // Next up: Show the chat UI here
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Check console for details.");
  }
});
