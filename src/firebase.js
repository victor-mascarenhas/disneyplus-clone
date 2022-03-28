import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD7jD4VacBf64dEjgMc-lEH6IlFETxxoJI",
  authDomain: "disneyplus-clone-5bdf7.firebaseapp.com",
  projectId: "disneyplus-clone-5bdf7",
  storageBucket: "disneyplus-clone-5bdf7.appspot.com",
  messagingSenderId: "692474508200",
  appId: "1:692474508200:web:a67b04bd8e2a8758c8239d",
  measurementId: "G-JQZCKCT1SN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
