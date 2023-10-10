"use client";
import {Box, Button, FormControl, Paper as MuiPaper, TextField, Typography} from "@mui/material";
import {config} from "@/config/config";
import styled from "@emotion/styled";
import {ChangeEvent, useCallback, useState} from "react";
import Link from "next/link";
import {APIRequest, ResponseData} from "@/app/user/APIRequest";


interface LoginResponse {
    refreshToken: string;
    statusCode: number;
    statusMsg: string;
    token: null | string;
}


const Paper = styled(MuiPaper)({
    minWidth: "36rem",
    minHeight: "25rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    justifyContent: "center",
    borderRadius: "1rem",
});

const divStyle = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
};


export default function Page() {

    const [changed, setChanged] = useState(false);
    const [usernameValue, setUserName] = useState("");
    const [passwordValue, setPassWordValue] = useState("")

    const onUserNameChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setUserName(event.target.value);
    }, []);
    const onPasswordChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setPassWordValue(event.target.value);
    }, []);

    const on_login = useCallback((_: any) => {
        fetch("/api/api-proxy",{
            method: "POST",
            body: JSON.stringify(
                {
                    path: "/api/user/login",
                    method: "GET",
                    data: {
                        username: usernameValue,
                        password: passwordValue,
                    } as object
                } as APIRequest
            )
        }).then(e => e.json() as Promise<ResponseData>)
        .then(e => {
            if(e.success){
                let login_response = e.response as LoginResponse;
                login_response.token
            }else{
                alert(e.response);
            }
        });
    }, []);

    const userName = <FormControl sx={{m: 1, minWidth: "24rem"}}>
        <TextField
            error={changed && !validUsername(usernameValue)}
            label={config.login.UserName}
            id={"input-username"}
            required
            variant={"outlined"}
            value={usernameValue}
            onChange={onUserNameChanged}
        >
        </TextField>
    </FormControl>;
    const password = <FormControl sx={{m: 1, minWidth: "24rem"}}>
        <TextField
            error={changed && !validPassword(passwordValue)}
            label={config.login.Password}
            id={"input-password"}
            required
            variant={"outlined"}
            value={passwordValue}
            onChange={onPasswordChanged}
            type={"password"}
        >
        </TextField>
    </FormControl>
    return <>
    <Box sx={divStyle}>
        <Paper elevation={24}>
            <Typography variant={"h3"} gutterBottom>
                {config.login.LoginText}
            </Typography>
            {userName}
            {password}
            <FormControl sx={{m: 1, minWidth: "12rem"}}>
                <Button
                    variant={"outlined"}
                    size={"large"}
                    onClick={on_login}
                >
                    {config.login.Submit}
                </Button>
            </FormControl>
            <Link href={"/user/register"}>
                <FormControl sx={{m: 1}}>
                    <Button
                        variant={"text"}
                            size={"small"}
                    >
                        {config.login.Question}
                    </Button>
                </FormControl>
            </Link>
        </Paper>
    </Box>
</>
    ;
}

// 校验用户名是否合法
function validUsername(username: string) {
    if (username.length < 4 || username.length > 16) {
        return false;
    }
    // 字符限制，只允许字母、数字、下划线
    const reg = /^[a-zA-Z0-9_]+$/;
    if (!reg.test(username)) {
        return false;
    }
    // 空格限制
    if (/\s/.test(username)) {
        return false;
    }
    // 敏感词限制，这里假设不允许包含 admin、root 等词汇
    return !(
        username.indexOf("admin") >= 0 || username.indexOf("root") >= 0
    );
}

// 校验密码是否合法
const validPassword = (password: string) => {
    if (password.length < 8) return false;
    return !(
        !/[0-9]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password)
    );
};