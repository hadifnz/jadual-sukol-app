import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCXMQB7wcwpggBEpMCRZF2tYupl7WuPenM",
  authDomain: "sukol2025.firebaseapp.com",
  projectId: "sukol2025",
  storageBucket: "sukol2025.appspot.com",
  messagingSenderId: "1096218308001",
  appId: "1:1096218308001:web:21e9e8cf29483803fd6fe0",
  databaseURL: "https://sukol2025-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);