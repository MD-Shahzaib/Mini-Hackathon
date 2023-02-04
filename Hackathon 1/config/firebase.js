// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);

function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function studentUploadImage(image) {
  const storageRef = ref(storage, `studentImg/${image.name}${Date.now()}`);
  const snapshot = await uploadBytes(storageRef, image);
  console.log("success the uploadImages function run");
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

function addStudentToDataBase(cardInformatin, imageurl) {
  const { fullName, fatherName, rollNo, contactNo, cnic, course } = cardInformatin;
  return addDoc(collection(db, "student"), { fullName, fatherName, rollNo, contactNo, cnic, course, imageurl });
}

export { signInFirebase, addStudentToDataBase, studentUploadImage }