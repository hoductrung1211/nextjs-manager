'use client';
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

export default function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}