"use client";
import {Alert, Box, Button, FormControl, Paper as MuiPaper, TextField, Typography} from "@mui/material";
import {config} from "@/config/config";
import styled from "@emotion/styled";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {api} from "@/app/user/api-request";
import {redirect} from "next/navigation";


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
    // useEffect(() => {
    //     document.cookie = "";
    // }, []);

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

    const [login, setLogin] = useState({
        submit: false,
        errorMsg: "",
    });


    let {data, error, isLoading} = api.useLogin(login.submit, {
        username: usernameValue,
        password: passwordValue
    })

    if (!error && data) {
        if(data.token){
            document.cookie = "token=" + data.token + ";path=/";
            redirect("/user/upload")
        }else{
            error = "没得到Token，请联系开发者";
        }
        setLogin({...login, submit: false});
    }

    const onLogin = useCallback((_: any) => {
        api.i++;
        setLogin({...login, submit: true, errorMsg: ""})
    }, [login]);

    if (error && login.submit) {
        setLogin({...login, submit: false, errorMsg: error});
    }

    let status = <>
        {
            (() => {
                if (isLoading) {
                    return <Alert severity={"warning"}>正在登录...</Alert>;
                }

                if (login.errorMsg) {
                    return <Alert severity={"error"}>{login.errorMsg}</Alert>;
                }

                return ""
            })()
        }
    </>;

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
                        onClick={onLogin}
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
                {status}
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