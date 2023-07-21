"use client";
import {ReactNode, useState} from "react";
import {theme} from "@/config/theme";
import {AppBar, WithTheme} from "@/components";
import {config} from "@/config/config";
import {Paper, Experimental_CssVarsProvider, useColorScheme} from "@mui/material";

interface ContentProps{
    elements: ReactNode,
}

export function Content({elements}: ContentProps) {

    return <WithTheme theme={theme}>
        <Experimental_CssVarsProvider>
            <AppBar title={config.AppBarText} />
            <Paper sx={{ display:"flex", padding: "1rem", width:"100%", height:"calc( 100% - 64px )", borderRadius: 0}}>
                {elements}
            </Paper>
        </Experimental_CssVarsProvider>
    </WithTheme>;
}