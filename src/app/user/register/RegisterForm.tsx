"use client";

import styled from "@emotion/styled";
import {
    Paper as MuiPaper,
    Box,
    Button,
    Select,
    FormHelperText,
    SelectChangeEvent,
    MenuItem,
    FormControl, InputLabel
} from "@mui/material";
import {config} from "@/config/config";
import {useEffect, useState} from "react";

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
    const [province, setProvince] = useState<string>('');
    const [city, setCity] = useState("");
    const [school, setSchool] = useState("");
    const [provinceData, setProvinceData] = useState<ProvinceData[]>([]);
    const [cityData, setCityData] = useState<CityData[][]>([[]]);
    const [schoolData, setSchoolData] = useState<SchoolData[]>([]);
    useEffect(() => {
        import("./schoolData").then(({provinceData, cityData, schoolData}) => {
            // @ts-ignore
            setProvinceData(provinceData as ProvinceData[]);
            // @ts-ignore
            setCityData(cityData as CityData[][]);
            // @ts-ignore
            setSchoolData(schoolData as SchoolData[]);
        })
    })
    const handleChange = (callback: any) => (event: SelectChangeEvent) => {
        callback(event.target.value);
    };

    const selectCity = <FormControl sx={{m: 1, minWidth: "24rem"}}>

        <InputLabel id={"select-city-label"} htmlFor={"select-city"}>
            {config.register.SelectCity}
        </InputLabel>
        <Select
            value={city}
            labelId={"select-city-label"}
            id={"select-city"}
            label={config.register.SelectCity}
            onChange={handleChange(setCity)}
        >
            {cityData[Number(province)].map((value, index) =>
                <MenuItem value={value.label} key={index}>{value.label}</MenuItem>
            )}
        </Select>
        <FormHelperText>{config.register.SelectCityHelperText}</FormHelperText>
    </FormControl>;

    const selectSchool = <FormControl sx={{m: 1, minWidth: "24rem"}}>

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

    return <Box sx={divStyle}>
        <Paper elevation={24}>
            <FormControl sx={{m: 1, minWidth: "24rem"}}>
                <InputLabel id={"select-province-label"} htmlFor={"select-province"}>
                    {config.register.SelectProvince}
                </InputLabel>
                <Select
                    value={province}
                    labelId={"select-province-label"}
                    id={"select-province"}
                    label={config.register.SelectProvince}
                    onChange={handleChange(setProvince)}
                >
                    {provinceData.map((value, index) =>
                        <MenuItem value={index} key={index}>{value.label}</MenuItem>
                    )}
                </Select>
                <FormHelperText>{config.register.SelectProvinceHelperText}</FormHelperText>
            </FormControl>
            {province !== '' && cityData && cityData[Number(province)] && selectCity}
            {city !== '' && schoolData && selectSchool}
            <FormControl sx={{m: 1, minWidth: "12rem"}}>
                <Button variant={"outlined"}> {config.register.Submit} </Button>
            </FormControl>
        </Paper>
    </Box>;
};

export {RegisterForm};