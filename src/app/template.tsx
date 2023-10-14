'use client';
import Login from "@/features/Login";
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material";
import { useEffect, useState } from "react";

const theme = createTheme({
    palette: {
        primary: {
            main: "#16A085",
            dark: "#16A085",
            light: "#16A085",
            contrastText: '#fff',
        }
    }
});

export default function Template({
    children
}: {
    children: React.ReactNode
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("accessToken"))
            setIsAuthenticated(false);
    });
     

    return (
        <ThemeProvider theme={theme}>
            {isAuthenticated ? children : <Login />}
        </ThemeProvider>
    )
}