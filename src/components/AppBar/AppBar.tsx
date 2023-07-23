"use client";
import {useRouter} from "next/router"
import {
    AppBar as MuiAppBar,
    Avatar,
    Box,
    IconButton, Menu, MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    useColorScheme
} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React, {useEffect, useMemo, useState} from "react";
import {config} from "@/config/config";
import Link from "next/link";

interface AppBarProps {
    title: String,
    login: boolean
}

const menu_items = [

    {
        name: config.appbar.profile_menu.Login,
        link: "/user/login",
        login: false
    },
    {
        name: config.appbar.profile_menu.Register,
        link: "/user/register",
        login: false,
    },
]

const genMenuItems = (login: boolean) => {
    return menu_items.filter(v => v.login == login).map(
        (value, index) =>
            <MenuItem key={index}>
                <Link href={value.link}>
                    <Typography>{value.name}</Typography>
                </Link>
            </MenuItem>
    );
}

function AppBar({title, login}: AppBarProps) {
    const [dark, setDark] = useState(true);
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const {setMode} = useColorScheme();

    useEffect(() => {
        if (!dark)
            setMode("light");
        else
            setMode("dark");

    }, [dark, setMode]);

    const menuItems = useMemo(
        () => genMenuItems(login),
        [login]
    );


    const ProfileMenu = useMemo(
        () => <Menu
            open={menuAnchor !== null}
            anchorEl={menuAnchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            sx={{ minWidth: '15rem' }}
            onClose={() => setMenuAnchor(null)}
        >
            {menuItems}
        </Menu>
        , [menuAnchor]);

    return <>
        <Box sx={{flexGrow: 1}}>
            <MuiAppBar position={"static"}>
                <Toolbar>
                    <Typography variant={"h5"} sx={{flexGrow: 1}}>
                        {title}
                    </Typography>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title={config.appbar.ProfileTooltip}>
                            <IconButton
                                onClick={(event) => setMenuAnchor(event.target as HTMLElement)}
                                sx={{p: 0}}>
                                <Avatar/>
                            </IconButton>
                        </Tooltip>
                        {ProfileMenu}
                    </Box>
                    <Box sx={{width: 2}}/>
                    <IconButton onClick={() => setDark(!dark)}>
                        {dark ? <LightModeIcon/> : <DarkModeIcon/>}
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
        </Box>
    </>;
};
export {AppBar};