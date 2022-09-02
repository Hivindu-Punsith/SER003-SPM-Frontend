// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCJhJjV4mmh5FeQKm_6lM-nIA3irxPAiAE",
  authDomain: "spm-ser003.firebaseapp.com",
  projectId: "spm-ser003",
  storageBucket: "spm-ser003.appspot.com",
  messagingSenderId: "1077840697866",
  appId: "1:1077840697866:web:b6af49415ae27240e3ddf3",
  measurementId: "G-0YKV8J12D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://spm-ser003.appspot.com');
export default storage;