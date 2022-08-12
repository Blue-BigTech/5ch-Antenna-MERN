import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const firebaseInitialization = () => {
    initializeApp(firebaseConfig);
}

export default firebaseInitialization;