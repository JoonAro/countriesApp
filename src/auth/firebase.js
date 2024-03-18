// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, addDoc, setDoc, collection, getFirestore, getDocs, deleteDoc } from "firebase/firestore"
import { getFavourites } from "../store/favouritesSlice"
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
        const newUserRef = doc(db, "users", user.uid);
        await setDoc(newUserRef, {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        const favCollection = collection(newUserRef, "favourites");
        console.log("User registered successfully:", user);
    } catch (error) {
        console.error("Error registering user:", error);
        alert(error.message);
    }
};

export const addUserFavourite = async (name) => {
    const uid = auth.currentUser.uid;
    const favouritesCollection = collection(db, "users", uid, "favourites");
    try {
        await addDoc(favouritesCollection, { name });
    }
    catch (error) {
        console.log('Error adding favourite to Firebase database: ', error)
    }
};

export const getUserFavourites = () => async (dispatch) => {
    const user = auth.currentUser;
    const uid = user.uid;
    if (user) {
        const q = await getDocs(collection(db, "users", uid, "favourites"));
        const favourites = q.docs.map((doc) => doc.data().name);
        dispatch(getFavourites(favourites));
    }
};

export const deleteUserFavourite = async (parameter) => {
    const uid = auth.currentUser.uid;
    const favCollection = collection(db, "users", uid, "favourites");
    try {
        if (!parameter) {
            console.error("Error removing favourite from Firebase database: name parameter is undefined");
            return;
        }
        const favSnapshot = await getDocs(favCollection);
        favSnapshot.forEach((doc) => {
            const favouriteData = doc.data();
            if (favouriteData.name === parameter) {
                console.log('Deleted', favouriteData);
                deleteDoc(doc.ref);
            }
        })
    }
    catch (error) {
        console.error("Error removing favourite from Firebase database: ", error);
    }
};

export const clearUserFavourites = async () => {
    const uid = auth.currentUser.uid;
    const favCollection = collection(db, "users", uid, "favourites");
    try {
        const favSnapshot = await getDocs(favCollection);
        favSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        })
        console.log('Deleted favourites from Firebase database');
    }
    catch (error) {
        console.error("Error removing favourites from Firebase database: ", error);
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