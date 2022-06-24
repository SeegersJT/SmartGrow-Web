import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCdQ_QoBVRpruaRapmwU42FweIno72hI6U",
    authDomain: "smart-grow-41b4b.firebaseapp.com",
    databaseURL: "https://smart-grow-41b4b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smart-grow-41b4b",
    storageBucket: "smart-grow-41b4b.appspot.com",
    messagingSenderId: "277220693264",
    appId: "1:277220693264:web:84a55ddead607725ef0195"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();

export default app;