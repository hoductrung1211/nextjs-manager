'use client';
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const theme = createTheme({
    palette: {
        primary: {
            main: "#16A085",
            dark: "#16A085",
            light: "#16A085",
            contrastText: '#fff',
        },
        success: {
            main: "#1abc9c",
            light: "#1abc9c",
            dark: "#1abc9c",
            contrastText: "#fff"
        },
        info: {
            main: "#3498db",
            light: "#3498db",
            dark: "#3498db",
            contrastText: "#fff"
        }
    },
    typography: {
        "fontSize": 14,
        "fontWeightRegular": 400,
        "fontWeightBold": 700,
    },
    components: {
        MuiTableCell: {
            "styleOverrides": {
                "sizeMedium": {
                    "fontSize": 13.5,
                },
            }
        },
        MuiTab: {
            "styleOverrides": {
                "root": {
                    "fontWeight": 700
                }
            }
        },
        MuiButton: {
            "styleOverrides": {
                "root": {
                    "height": 40,
                    "fontWeight": 600,
                }
            }
        },
    }
}); 