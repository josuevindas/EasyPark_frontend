// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "Preguntar Josue",
    authDomain: "Preguntar Josue",
    projectId: "Preguntar Josue",
    storageBucket: "Preguntar Josue",
    messagingSenderId: "Preguntar Josue",
    appId: "Preguntar Josue",
    measurementId: "Preguntar Josue"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
