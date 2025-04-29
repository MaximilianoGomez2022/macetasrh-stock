// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ⚠️ Usá los datos reales de tu proyecto desde Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyDB-xkyBCLjLVp2SpPzAJekl5qSer-Iqyo',
  authDomain: 'macetas-rh.firebaseapp.com',
  projectId: 'macetas-rh',
  storageBucket: 'macetas-rh.firebasestorage.app',
  messagingSenderId: '223060384662',
  appId: '1:223060384662:web:fe709ed5210f7b6808dbb7',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
