"use client";
import { AuthProvider } from "@/context/AuthContext";
import Nav from "@/components/Nav";

const Provider = ({ children }) => {
    return (
        <AuthProvider>
            <Nav />
            {children}
        </AuthProvider>
    );
};

export default Provider;
