// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "countries-6a68c.firebaseapp.com",
    projectId: "countries-6a68c",
    storageBucket: "countries-6a68c.appspot.com",
    messagingSenderId: "596975822467",
    appId: "1:596975822467:web:b7e7d28b7e738ef6b2ddb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Here we get access to the project authentication
const auth = getAuth(app);
// Here we get access to the project database
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        //add a document and within that document a collection with user details
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            favourites,
        })
    }
    catch (error) {
        console.log(error);
        alert(error.message);
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        console.log(error);
        alert(error.message);
    }
};
export const logout = () => {
    auth.signOut()
};



export { auth, db, registerWithEmailAndPassword };