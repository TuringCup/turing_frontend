"use client";
import {Box, Button, FormControl, Paper as MuiPaper, Typography, styled} from "@mui/material";
import {config} from "@/config/config";
import UploadFileBtn from "@/app/user/upload/UploadFileBtn";
import {useEffect, useRef} from "react";

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
export default function Page(){
    const ref = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(ref.current){
            console.log(ref.current);
            ref.current.addEventListener("change", (e)=>{
                console.log(ref.current?.value)
            });
        }
    },[ref.current]);
    return <>
        <Box sx={divStyle}>
            <Paper elevation={24}>
                <Typography variant={"h3"} gutterBottom>
                    {config.upload.Upload}
                </Typography>
                <FormControl sx={{ m: 1, minWidth: "12rem" }}>
                    <UploadFileBtn text={config.upload.Upload} ref={ref}></UploadFileBtn>
                </FormControl>
            </Paper>
        </Box>
    </>;
}