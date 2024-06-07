/**
 * Innehåller Firebase-konfigurationen. Exporterar referenser till Firebase-databasen
 * som används för att hantera uppgifterna.
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, remove, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCqZF3sRnVStTA8y4YZNfR7NH6UrEGNB9Q",
  authDomain: "scrum-board-93345.firebaseapp.com",
  databaseURL: "https://scrum-board-93345-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrum-board-93345",
  storageBucket: "scrum-board-93345.appspot.com",
  messagingSenderId: "866475140642",
  appId: "1:866475140642:web:2810bdc8255e9a2a714c7b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const tasksRef = ref(db, 'tasks');

export { tasksRef, set, push, onValue, remove, ref, child };
