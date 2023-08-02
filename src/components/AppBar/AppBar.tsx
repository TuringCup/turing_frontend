"use client";
import { config } from "@/config/config";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    AppBar as MuiAppBar,
    Toolbar,
    Tooltip,
    Typography,
    useColorScheme,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

interface AppBarProps {
    title: String;
    login: boolean;
}

const menu_items = [
    {
        name: config.appbar.profile_menu.Login,
        link: "/user/login",
        login: false,
    },
    {
        name: config.appbar.profile_menu.Register,
        link: "/user/register",
        login: false,
    },
];

const genMenuItems = (login: boolean) => {
    return menu_items
        .filter((v) => v.login == login)
        .map((value, index) => (
            <Link href={value.link} key={index}>
                <MenuItem>
                    <Typography sx={{ minWidth: "4rem", textAlign: "center" }}>
                        {value.name}
                    </Typography>
                </MenuItem>
            </Link>
        ));
};

function AppBar({ title, login }: AppBarProps) {
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const { setMode, mode } = useColorScheme();

    const menuItems = useMemo(() => genMenuItems(login), [login]);

    const ProfileMenu = useMemo(
        () => (
            <Menu
                open={menuAnchor !== null}
                anchorEl={menuAnchor}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                sx={{ minWidth: "15rem" }}
                onClose={() => setMenuAnchor(null)}
            >
                {menuItems}
            </Menu>
        ),
        [menuAnchor, menuItems]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position={"static"}>
                <Toolbar>
                    <Typography variant={"h5"} sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={config.appbar.ProfileTooltip}>
                            <IconButton
                                onClick={(event) =>
                                    setMenuAnchor(event.target as HTMLElement)
                                }
                                sx={{ p: 0 }}
                            >
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        {ProfileMenu}
                    </Box>
                    <Box sx={{ width: 2 }} />
                    <IconButton
                        onClick={() => {
                            if (mode === "light") {
                                setMode("dark");
                            } else {
                                setMode("light");
                            }
                        }}
                    >
                        {mode === "dark" || !mounted ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )}
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}
export { AppBar };
