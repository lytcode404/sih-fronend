import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, signOut } from "@/services/authService";
import Link from "next/link";

const Nav = () => {
    const { user, loading } = useAuth();
    const [isBrowser, setIsBrowser] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        // Check if the component is mounted in the browser
        setIsBrowser(typeof window !== "undefined");
        if (isBrowser) {
            setCurrentPath(window.location.pathname);
        }
    }, [isBrowser]);

    return (
        <header className="py-3 md:py-4 sticky top-0 bg-white z-2 shadow-md">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            title="Logo"
                            className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                        >
                            <img
                                className="w-full h-16"
                                src="logo.jpeg"
                                alt="Logo"
                            />
                        </Link>
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
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links (Centered) */}
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
                        <div className="flex space-x-8 xl:space-x-16">
                            <Link
                                href="/#features"
                                title="Features"
                                className={`text-base font-medium transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 ${
                                    currentPath === "/#features"
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-900"
                                }`}
                            >
                                Features
                            </Link>
                            <Link
                                href="/#HIW"
                                title="How it Works"
                                className={`text-base font-medium transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 ${
                                    currentPath === "/#HIW"
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-900"
                                }`}
                            >
                                How it Works
                            </Link>
                            <Link
                                href="/upload"
                                title="Upload PDF"
                                className={`text-base font-medium transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 ${
                                    currentPath === "/upload"
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-900"
                                }`}
                            >
                                Upload PDF
                            </Link>
                            <Link
                                href="/search"
                                title="Search"
                                className={`text-base font-medium transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 ${
                                    currentPath === "/search"
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-900"
                                }`}
                            >
                                Search
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Nav;
