"use client";

import styled from "@emotion/styled";
import {
    Paper as MuiPaper,
    Box,
    Button,
    Select,
    FormHelperText,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { config } from "@/config/config";
import {CSSProperties, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {api} from "@/app/user/api-request";
import {redirect} from "next/navigation";

const Paper = styled(MuiPaper)({
    minWidth: "50rem",
    minHeight: "36rem",
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
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
} as CSSProperties;

interface ProvinceData {
    label: string;
    value: number;
}

interface CityData {
    label: string;
    value: number;
}

interface SchoolData {
    province: string;
    city: string;
    name: string;
}

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [province, setProvince] = useState<string>("");
    const [city, setCity] = useState("");
    const [school, setSchool] = useState("");
    const [provinceData, setProvinceData] = useState<ProvinceData[]>([]);
    const [cityData, setCityData] = useState<CityData[][]>([[]]);
    const [schoolData, setSchoolData] = useState<SchoolData[]>([]);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerFailed, setRegisterFailed] = useState(false);
    const [changed, setChanged] = useState(false);
    const [schoolId, setSchoolId] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (registerFailed) setChanged(true);
        import("./schoolData").then(
            ({ provinceData, cityData, schoolData }) => {
                // @ts-ignore
                setProvinceData(provinceData as ProvinceData[]);
                // @ts-ignore
                setCityData(cityData as CityData[][]);
                // @ts-ignore
                setSchoolData(schoolData as SchoolData[]);
            }
        );
    }, [registerFailed]);
    const checkPwdValidation = () => {
        if (password.length < 8) return false;
        return !(
            !/[0-9]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[A-Z]/.test(password)
        );
    };
    const checkUserNameValidation = () => {
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
    };
    const handleChange =
        (callback: any) => (event: { target: { value: any } }) => {
            callback(event.target.value);
            setChanged(true);
        };
    const handleProvinceChange =
        (callback: any) => (event: { target: { value: any } }) => {
            setCity("");
            setSchool("");
            callback(event.target.value);
            setChanged(true);
        };
    const handleCityChange =
        (callback: any) => (event: { target: { value: any } }) => {
            setSchool("");
            callback(event.target.value);
            setChanged(true);
        };

    const selectProvince = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <InputLabel
                id={"select-province-label"}
                htmlFor={"select-province"}
                required
            >
                {config.register.SelectProvince}
            </InputLabel>
            <Select
                error={changed && province === ""}
                required
                value={province}
                labelId={"select-province-label"}
                id={"select-province"}
                label={config.register.SelectProvince}
                onChange={handleProvinceChange(setProvince)}
            >
                {provinceData.map((value, index) => (
                    <MenuItem value={index} key={index}>
                        {value.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>
                {config.register.SelectProvinceHelperText}
            </FormHelperText>
        </FormControl>
    );

    const selectCity = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <InputLabel
                id={"select-city-label"}
                htmlFor={"select-city"}
                required
            >
                {config.register.SelectCity}
            </InputLabel>
            <Select
                error={changed && city == ""}
                required
                value={city}
                labelId={"select-city-label"}
                id={"select-city"}
                label={config.register.SelectCity}
                onChange={handleCityChange(setCity)}
            >
                {cityData[Number(province)].map((value, index) => (
                    <MenuItem value={value.label} key={index}>
                        {value.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>
                {config.register.SelectCityHelperText}
            </FormHelperText>
        </FormControl>
    );

    const selectSchool = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <InputLabel
                id={"select-school-label"}
                htmlFor={"select-school"}
                required
            >
                {config.register.SelectSchool}
            </InputLabel>
            <Select
                error={changed && school == ""}
                value={school}
                labelId={"select-school-label"}
                id={"select-school"}
                label={config.register.SelectSchool}
                onChange={handleChange(setSchool)}
            >
                {schoolData
                    .filter((v) => v.city === city)
                    .map((value, index) => (
                        <MenuItem value={value.name} key={index}>
                            {value.name}
                        </MenuItem>
                    ))}
            </Select>
            <FormHelperText>
                {config.register.SelectSchoolHelperText}
            </FormHelperText>
        </FormControl>
    );

    const inputSchoolID = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <TextField
                id={"schoolid"}
                required
                label={config.register.SchoolID}
                variant="outlined"
                onChange={(e) => setSchoolId(e.target.value)}
                value={schoolId}
            ></TextField>
        </FormControl>
    )

    const inputUserName = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <TextField
                error={changed && !checkUserNameValidation()}
                id={"username"}
                required
                label={config.register.UserName}
                variant="outlined"
                onChange={handleChange(setUsername)}
                helperText={config.register.UserNameHelperText}
            ></TextField>
        </FormControl>
    );

    const inputPwd = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <TextField
                id={"password"}
                error={changed && !checkPwdValidation()}
                required
                label={config.register.Password}
                variant={"outlined"}
                type={"password"}
                onChange={handleChange(setPassword)}
                helperText={config.register.PasswordHelperText}
            ></TextField>
        </FormControl>
    );

    const inputEmail = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <TextField
                error={changed && email === ""}
                id={"email"}
                required
                label={config.register.Email}
                variant={"outlined"}
                type={"email"}
                onChange={handleChange(setEmail)}
            ></TextField>
            <FormHelperText>
                {config.register.EmailHelperText}
            </FormHelperText>
        </FormControl>
    );

    const inputPhone = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <TextField
                id={"phone"}
                required
                label={config.register.Phone}
                variant={"outlined"}
                value={phone}
                onChange={e=> setPhone(e.target.value)}
            ></TextField>
            <FormHelperText>
                {config.register.PhoneHelperText}
            </FormHelperText>
        </FormControl>
    )

    const inputRealName = (
        <FormControl sx={{ m: 0.5, minWidth: "24rem" }}>
            <TextField
                id={"name"}
                required
                label={config.register.Name}
                variant={"outlined"}
                value={name}
                onChange={e=>setName(e.target.value)}
            ></TextField>
            <FormHelperText>
                {config.register.NameHelperText}
            </FormHelperText>
        </FormControl>
    )

    const [register, setRegister] = useState({
        submit: false,
        errorMsg: "",
        success: false,
    });
    
    // 处理注册
    // 不是很懂不知道对不对
    const handleSubmit = () => {
        if (!checkUserNameValidation() || !checkPwdValidation()) {
            setRegisterFailed(true);
            return;
        }
        api.i++;
        setRegister({...register, submit: true, errorMsg: "", success: false})
    };

    let {data, error, isLoading} = api.useRegister(register.submit, {
        username,
        password,
        name,
        city,
        email,
        school,
        schoolId,
        phone,
        province
    })

    if (!error && data) {
        setRegister({...register, submit: false, success: true});
    }
    
    if (error && register.submit) {
        setRegister({...register, submit: false, errorMsg: error, success: false});
    }

    let status = <>
        {
            (() => {
                if (isLoading) {
                    return <Alert severity={"warning"}>正在注册...</Alert>;
                }

                if (register.errorMsg) {
                    return <Alert severity={"error"}>{register.errorMsg}</Alert>;
                }

                return register.success? <Alert severity={"success"}>{config.register.RegisterSuccessText}</Alert> : ""
            })()
        }
    </>;
    const submitBtn = (
        <FormControl sx={{ m: 0.5, minWidth: "12rem" }}>
            <Button variant={"outlined"} onClick={handleSubmit}>
                {" "}
                {config.register.Submit}{" "}
            </Button>
        </FormControl>
    );

    return (
        <Box sx={divStyle}>
            <Paper elevation={24}>
                <Typography variant={"h3"} gutterBottom>
                    注册
                </Typography>
                <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "row", maxHeight: "22rem"}}>
                    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", maxHeight: "22rem"}}>
                        {inputUserName}
                        {inputPwd}
                        {inputEmail}
                        {inputPhone}
                        {inputRealName}
                    </Box>
                    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", maxHeight: "22rem"}}>
                        {selectProvince}
                        {province !== "" &&
                            cityData &&
                            cityData[Number(province)] &&
                            selectCity}
                        {city !== "" && schoolData && selectSchool}
                        {school !== "" && inputSchoolID}
                    </Box>

                </Box>
                {submitBtn}
                {status}
            </Paper>
        </Box>
    );
};

export default Page;
