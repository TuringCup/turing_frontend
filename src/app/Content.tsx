"use client";
import { AppBar } from "@/components";

import { config } from "@/config/config";
import { Paper } from "@mui/material";
import { ReactNode, useState } from "react";

import dynamic from "next/dynamic";
const ThemeRegistry = dynamic(
    () => import("@/components/ThemeRegistry/ThemeRegistry"),
    { ssr: false }
);

interface ContentProps {
    elements: ReactNode;
}

export function Content({ elements }: ContentProps) {
    const [login, setLogin] = useState(false);
    return (
        <ThemeRegistry>
            <AppBar title={config.appbar.Title} login={login} />
            <Paper
                sx={{
                    display: "flex",
                    padding: "1rem",
                    width: "100%",
                    height: "calc( 100% - 64px )",
                    borderRadius: 0,
                }}
            >
                {elements}
            </Paper>
        </ThemeRegistry>
    );
}
