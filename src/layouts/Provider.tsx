'use client';
import { AlertProvider } from "@/hooks/useAlert"
import { AuthProvider } from "@/hooks/useAuth"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { theme } from "@/configs/theme";
import { ModalProvider } from "@/hooks/useModel";
import { LoadingAnimationProvider } from "@/hooks/useLoadingAnimation";


export default function Provider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <AuthProvider>
        <AlertProvider>
        <ModalProvider>
        <LoadingAnimationProvider>
            {children}
        </LoadingAnimationProvider>
        </ModalProvider>
        </AlertProvider>
        </AuthProvider>
        </LocalizationProvider>
        </ThemeProvider>
    )
}