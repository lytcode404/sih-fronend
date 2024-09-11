// services/authService.js
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

export const signInWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        return null;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        console.log("Signed out successfully");
        return true;
    } catch (error) {
        console.error("Error signing out:", error);
        return false;
    }
};
