import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChRvOnqAN5WsGJc1UX55zvYWKe-rUzSp8",
  authDomain: "attendance-6aa32.firebaseapp.com",
  projectId: "attendance-6aa32",
  storageBucket: "attendance-6aa32.appspot.com",
  messagingSenderId: "1022640123823",
  appId: "1:1022640123823:web:dc043e1ed422faec9ec95a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

function classDetail(teacher, time, schedule, section, course, batch) {
  return addDoc(collection(db, "course"), { teacher, time, schedule, section, course, batch })
}

async function uploadImage(image) {
  const storageRef = ref(storage, `images/${image.name}`)
  const snapshot = await uploadBytes(storageRef, image)
  const url = await getDownloadURL(snapshot.ref)
  return url
}

function studentInfo(name, fname, roll, cont, cnic, course, imageUrl) {
  return addDoc(collection(db, "student"), { name, fname, roll, cont, cnic, course, imageUrl })
}

async function options() {
  const querySnapshot = await getDocs(collection(db, "course"))
  const ads = []
  querySnapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  })
  return ads
}

function getRealtimeCard(roll_number, callback) {
  console.log(`chat firebase.`);
  const q = query(collection(db, "student"), where(`${roll_number}`, "==", roll))
  onSnapshot(q, (querySnapshot) => {
    const student_details = []
    querySnapshot.forEach((doc) => {
      student_details.push({ id: doc.id, ...doc.data() })
    })
    console.log(student_details);
    callback(student_details)
  })
}

export {
  signInFirebase,
  classDetail,
  uploadImage,
  studentInfo,
  options,
  getRealtimeCard
}