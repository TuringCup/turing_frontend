"use client";

import { theme } from "@/config/theme";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    getInitColorSchemeScript,
} from "@mui/material/styles";
import * as React from "react";
import { NextAppDirEmotionCacheProvider } from "../EmotionCache/EmotionCache";

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            {getInitColorSchemeScript({ defaultMode: "dark" })}
            <CssVarsProvider defaultMode="dark" theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </CssVarsProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
