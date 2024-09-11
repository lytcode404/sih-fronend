"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { signInWithGoogle } from "@/services/authService";
import HomePage from "@/components/HomePage/HomePage";
import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import HIW from "@/components/HowItWork/HIW";

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <HomePage />
            <Feature/>
            <HIW/>
            <Footer/>
        </>
    );
}

