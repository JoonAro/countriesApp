// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, addDoc, setDoc, collection, getFirestore, updateDoc, getDocs, query, getDoc, deleteDoc } from "firebase/firestore"
import { useSelector } from "react-redux";
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
        await addDoc(favCollection, {});

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
        console.log('add', error)
    }
};

export const getUserFavourites = () => async (dispatch) => {
    const uid = auth.currentUser.uid;
    const q = await getDocs(collection(db, "users", uid, "favourites"));
    const favourites = q.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
};

export const deleteUserFavourite = async (parameter) => {
    const uid = auth.currentUser.uid;
    const userDoc = doc(db, "users", uid);
    const favCollection = collection(userDoc, "favourites");
    try {
        const userSnapShot = await getDoc(userDoc);
        if (userSnapShot.exists()) {
            const userData = userSnapShot.data();
            const favSnapshot = await getDocs(favCollection);
            favSnapshot.forEach((doc) => {
                const favouriteData = doc.data();
                console.log(favouriteData, parameter);
                if (favouriteData.name === parameter) {
                    console.log('Deleted', favouriteData);
                    deleteDoc(doc.ref);
                }
            })
        }
        else ("no user data found with uid", uid)
    }
    catch (error) {
        console.log(error);
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

export const getNameOfUser = async (user) => {
    if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const name = doc.data().name;
            console.log("name from getNameOfuser: ", name);
            return name;
        });
    } else {
        return null;
    }
}

export { auth, db, registerWithEmailAndPassword };