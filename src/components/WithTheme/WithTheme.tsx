"use client";
import {ThemeProvider, createTheme} from "@mui/material";
function WithTheme({ theme, children }: any){
    return <ThemeProvider theme={createTheme(theme)} >
        {children}
    </ThemeProvider>
}

export { WithTheme};