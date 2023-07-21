"use client";
import {AppBar as MuiAppBar, Box, IconButton, Toolbar, Typography, useColorScheme} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useEffect, useLayoutEffect, useState} from "react";

interface AppBarProps{
    title: String,
}
function AppBar({ title} : AppBarProps) {
    let [dark, setDark] = useState(true);
    let {setMode} = useColorScheme();

    useEffect(()=>{
        if(!dark)
            setMode("light");
        else
            setMode("dark");

    },[dark, setMode]);
    return <>
        <Box sx={{flexGrow: 1}}>
            <MuiAppBar position={"static"}>
                <Toolbar>
                    <Typography variant={"h5"} sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton onClick={() => setDark(!dark)}>
                        {dark? <LightModeIcon/> : <DarkModeIcon/>}
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
        </Box>
    </>;
};
export { AppBar };