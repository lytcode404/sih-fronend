// components/GoogleSignIn.js
"use client";

import { signInWithGoogle } from "@/services/authService";

export default function GoogleSignIn() {
    const handleGoogleSignIn = async () => {
        const user = await signInWithGoogle();
        if (user) {
            // Handle successful sign-in
            console.log("Signed in with Google:", user);
        } else {
            // Handle sign-in error
            console.log("Failed to sign in with Google");
        }
    };

    return (
        <div>
            <h2>Sign In with Google</h2>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    );
}
