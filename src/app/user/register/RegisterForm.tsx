"use client";

import styled from "@emotion/styled";
import {
  Paper as MuiPaper,
  Box,
  Button,
  Select,
  FormHelperText,
  MenuItem,
  FormControl, InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { config } from "@/config/config";
import { useEffect, useState } from "react";

const Paper = styled(MuiPaper)({
  minWidth: "50rem",
  minHeight: "40rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1em"
});

const divStyle = {
  display: "flex",
  flexGrow: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center"
};

interface ProvinceData {
  label: string,
  value: number
}

interface CityData {
  label: string,
  value: number
}

interface SchoolData {
  province: string,
  city: string,
  name: string
}

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [provinceData, setProvinceData] = useState<ProvinceData[]>([]);
  const [cityData, setCityData] = useState<CityData[][]>([[]]);
  const [schoolData, setSchoolData] = useState<SchoolData[]>([]);

  useEffect(() => {
    import("./schoolData").then(({ provinceData, cityData, schoolData }) => {
      // @ts-ignore
      setProvinceData(provinceData as ProvinceData[]);
      // @ts-ignore
      setCityData(cityData as CityData[][]);
      // @ts-ignore
      setSchoolData(schoolData as SchoolData[]);
    })
  })
  const handleChange = (callback: any) => (event: { target: { value: any; }; }) => {
    callback(event.target.value);
  };
  const handleProvinceChange = (callback: any) => (event: { target: { value: any; }; }) => {
    setCity("");
    setSchool("");
    callback(event.target.value);
  }
  const handleCityChange = (callback: any) => (event: { target: { value: any; }; }) => {
    setSchool("");
    callback(event.target.value);
  }
  const checkPwdValidation = () => {
    if (password.length < 8) return false;
    if (
      !/[0-9]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) return false;
    return true;
  }

  const selectProvince = <FormControl sx={{ m: 1, minWidth: "24rem" }}>
    <InputLabel id={"select-province-label"} htmlFor={"select-province"}>
      {config.register.SelectProvince}
    </InputLabel>
    <Select
      value={province}
      labelId={"select-province-label"}
      id={"select-province"}
      label={config.register.SelectProvince}
      onChange={handleProvinceChange(setProvince)}
    >
      {provinceData.map((value, index) =>
        <MenuItem value={index} key={index}>{value.label}</MenuItem>
      )}
    </Select>
    <FormHelperText>{config.register.SelectProvinceHelperText}</FormHelperText>
  </FormControl>

  const selectCity = <FormControl sx={{ m: 1, minWidth: "24rem" }}>

    <InputLabel id={"select-city-label"} htmlFor={"select-city"}>
      {config.register.SelectCity}
    </InputLabel>
    <Select
      value={city}
      labelId={"select-city-label"}
      id={"select-city"}
      label={config.register.SelectCity}
      onChange={
        handleCityChange(setCity)
      }
    >
      {cityData[Number(province)].map((value, index) =>
        <MenuItem value={value.label} key={index}>{value.label}</MenuItem>
      )}
    </Select>
    <FormHelperText>{config.register.SelectCityHelperText}</FormHelperText>
  </FormControl>;

  const selectSchool = <FormControl sx={{ m: 1, minWidth: "24rem" }}>

    <InputLabel id={"select-school-label"} htmlFor={"select-school"}>
      {config.register.SelectSchool}
    </InputLabel>
    <Select
      value={school}
      labelId={"select-school-label"}
      id={"select-school"}
      label={config.register.SelectSchool}
      onChange={handleChange(setSchool)}
    >
      {schoolData.filter((v) => v.city === city).map((value, index) =>
        <MenuItem value={value.name} key={index}>{value.name}</MenuItem>
      )}
    </Select>
    <FormHelperText>{config.register.SelectSchoolHelperText}</FormHelperText>
  </FormControl>;

  const inputUserName = <FormControl sx={{ m: 1, minWidth: "24rem" }}>
    <TextField
      id={"username"} required
      label={config.register.UserName} variant="outlined"
    ></TextField>
  </FormControl>

  const inputPwd = <FormControl sx={{ m: 1, minWidth: "24rem" }}>
    <TextField
      id={"password"}
      error={!checkPwdValidation()}
      required
      label={config.register.Password}
      variant={"outlined"}
      type={"password"}
      onChange={handleChange(setPassword)}
      helperText={config.register.PasswordHelperText}
    >
    </TextField>
  </FormControl>

  const inputEmail = <FormControl sx={{ m: 1, minWidth: "24rem" }}>
    <TextField
      id={"email"} required
      label={config.register.Email} variant={"outlined"}
      type={"email"}
      onChange={handleChange(setEmail)}
    >
    </TextField>
  </FormControl>

  const submitBtn = <FormControl sx={{ m: 1, minWidth: "12rem" }}>
    <Button variant={"outlined"}> {config.register.Submit} </Button>
  </FormControl>

  return <Box sx={divStyle}>
    <Paper elevation={24}>
      <Typography variant={"h3"} gutterBottom>注册</Typography>
      {inputUserName}
      {inputPwd}
      {inputEmail}
      {selectProvince}
      {province !== '' && cityData && cityData[Number(province)] && selectCity}
      {city !== '' && schoolData && selectSchool}
      {submitBtn}
    </Paper>
  </Box>;
};

export { RegisterForm };