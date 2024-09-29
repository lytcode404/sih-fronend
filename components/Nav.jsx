import React from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, signOut } from "@/services/authService";
import Link from "next/link";

const Nav = () => {
    const { user, loading } = useAuth();

    // const handleGoogleSignIn = async () => {
    //     await signInWithGoogle();
    // };

    // const handleGoogleSignOut = async () => {
    //     await signOut();
    // };

    return (
        <>
            <header className="py-3 md:py-4 sticky top-0 bg-white z-2 shadow-md">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                title="Logo"
                                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                            >
                                <img
                                    className="w-full h-16" // Increased the height from h-12 to h-16
                                    src="logo.jpeg"
                                    alt="Logo"
                                />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-900">
                                <svg
                                    className="w-7 h-7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links (Centered) */}
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
                            <div className="flex space-x-8 xl:space-x-16">
                                <a
                                    href="#feature"
                                    title="Features"
                                    className={`text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 `}
                                >
                                    Features
                                </a>
                                <a
                                    href="#HIW"
                                    title="How it Works"
                                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                >
                                    How it Works
                                </a>
                                <a
                                    href="/upload"
                                    title="Upload PDF"
                                    className={`text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 ${
                                        window.location.href.includes("upload")
                                            ? "text-blue-500 font-bold"
                                            : ""
                                    }`}
                                >
                                    Upload PDF
                                </a>

                                <a
                                    href="/search"
                                    title="Search"
                                    className={`text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 ${
                                        window.location.href.includes("search")
                                            ? "text-blue-500 font-bold  "
                                            : ""
                                    }`}
                                >
                                    Search
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Nav;
