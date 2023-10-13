import useSWR from "swr";
import {useState} from "react";

type APIResponse<T> = {
    success: boolean,
    response: T | string, // 当且仅当success是false的时候才是string
}

type ApiRequest = {
    path?: string,
    method?: "POST" | "GET" | "PUT" | "DELETE",
    data?: object | string, 
}



interface LoginResponse {
    refreshToken: string;
    errorCode: number;
    errorMsg: string;
    token: null | string;
}


interface LoginRequest{
    username:  string,
    password: string
}


export interface RegisterRequest {
    city: string;
    email: string;
    password: string;
    phone: string;
    province: string;
    school: string;
    schoolId: string;
    username: string;
}

interface RegisterResponse {
    errorCode: number;
    errorMsg: string;
}



 const api =  {
    i: 0,
    useLogin( condition: boolean, request : LoginRequest ) {
        return useSWR(condition ? "/api/user/login?id=" + api.i : null, async(path) => {
            return fetch("/api/apiProxy", {
                method: "POST",
                body: JSON.stringify(
                    {
                        path,
                        method: "GET",
                        data: JSON.stringify(request)
                    } as ApiRequest
                )
            }).then(e => e.json() )
                .then(e => e as APIResponse<LoginResponse>)
                .then(value => 
                    value.success ? 
                        value.response as LoginResponse : 
                        Promise.reject(value.response as string)
                )
                .then(response => 
                    response.errorCode == 200 ? 
                    response :
                    Promise.reject(response.errorMsg)
                )
        },{
            refreshInterval: 1000
        })
    },

    useRegister( condition: boolean, request : RegisterRequest ) {
        return useSWR(condition ? "/api/user/register?id=" + api.i : null, async(path) => {
            return fetch("/api/apiProxy", {
                method: "POST",
                body: JSON.stringify(
                    {
                        path,
                        method: "POST",
                        data: JSON.stringify(request)
                    } as ApiRequest
                )
            }).then(e => e.json() )
                .then(e => e as APIResponse<RegisterResponse>)
                .then(value =>
                    value.success ?
                        value.response as RegisterResponse :
                        Promise.reject(value.response as string)
                )
                .then(response =>
                    response.errorCode == 200 ?
                        response :
                        Promise.reject(response.errorMsg)
                )
        },{
            refreshInterval: 1000
        })
    },
    
    async verifyToken(token: string) {
        const e = await fetch("/api/verifyToken", {
            method: "POST"
        });
        const e_1 = await e.json() as APIResponse<any>;
        return e_1.success && e_1.response.errorCode == 200;
    }
};

export {api};