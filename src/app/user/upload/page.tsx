"use client";
import {Box, Button, FormControl, Paper as MuiPaper, Typography, styled, Alert} from "@mui/material";
import {config} from "@/config/config";
import UploadFileBtn from "@/app/user/upload/UploadFileBtn";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {redirect} from "next/navigation";
import {api} from "@/app/user/api-request";
import {File} from "buffer";

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
    const ref = useRef<HTMLInputElement>(null);
    const [uploadState, setUploadState] = useState({
        upload:false,
        ok: true,
        msg: ""
    });
    useCookieTokenVerify();

   let onChange = (e: ChangeEvent<HTMLInputElement>) =>{
            upload_file(e.target as HTMLInputElement, (ok, msg) => {
                setUploadState({
                    upload: true,
                    ok,
                    msg
                });
            });
            e.target.value = "";
    };


    let status = <>
        {
            (() => {
                if (uploadState.upload) {

                    if (!uploadState.ok) {
                        return <Alert severity={"error"}>{uploadState.msg}</Alert>;
                    }

                    return <Alert severity={"success"}>{uploadState.msg}</Alert>;
                }
                return "";
            })()
        }
    </>;
    
    return <>
        <Box sx={divStyle}>
            <Paper elevation={24}>
                <Typography variant={"h3"} gutterBottom>
                    {config.upload.Upload}
                </Typography>
                <FormControl sx={{m: 1, minWidth: "12rem"}}>
                    <UploadFileBtn text={config.upload.Upload} ref={ref} onChange={onChange}></UploadFileBtn>
                </FormControl>
                <br/>
                {status}
            </Paper>
        </Box>
    </>;
}

function upload_file(input: HTMLInputElement, setUploadState: (ok:boolean, msg: string)=>void) {
    if (input.files == null)
        return;

    if (input.files.length == 0)
        return;
    
    if(!confirm(config.upload.UploadConfirm.replace("{}", input.value))){
        return;
    }
    
    let value = input.files.item(0);
    if (value) {
        let form = new FormData();
        form.append("token", getCookie("token") as string);
        form.append("file", value);
        value.arrayBuffer().then(file => {
                fetch("http://49.234.15.205:5001/api/user/upload" + value?.name, {
                    method: "POST",
                    body: form
                }).then(e => e.json())
                    .then(e => e.response)
                    .then(e => e.errorCode == 200 ? setUploadState(true, e.errorMsg) : setUploadState(false, e.errorMsg))
                    .catch(e => setUploadState(false, e.toString()))
            }
        );
    }
}


function useCookieTokenVerify() {
    useEffect(() => {
        let interval = setInterval(() => {
            let result = getCookie("token");
            if (result != null) {
                api.verifyToken(result).then(e => {
                    if (!e) {
                        clearInterval(interval);
                        alert("登录过期，请重新登录");
                        delCookie("token")
                        document.cookie = "";
                        window.location.href = "/";
                    }
                }).catch(e => {
                    console.error(e)
                });
            } else {
                clearInterval(interval);
                alert("登录过期，请重新登录");
                delCookie("token")
                window.location.href = "/";
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);
}


function getCookie(name: string) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg)) !== null) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

function delCookie(name: string) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + (exp as any).toGMTString() + "; path=/";
    }
}