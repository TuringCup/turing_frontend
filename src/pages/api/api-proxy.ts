import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type ResponseData = {
    success: boolean,
    response: object | string
}

const allow_paths = [
    "/api/user/register",
    "/api/user/login",
    "/api/user/upload"
]

const host = "http://49.234.15.205:5001";

type APIRequest = {
    path?: string,
    method?: "POST" | "GET" | "PUT" | "DELETE",
    data?: string,
}


async function wait(time:number){
    return new Promise((res) => {
        setTimeout(res, time)
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await wait(1200);
    if (req.method?.toLowerCase() !== "post") {
        res.status(404).redirect("/404");
        return;
    }
    try {
        let request: APIRequest = JSON.parse(req.body.toString());
        let allow_path = allow_paths.filter(v => request.path?.startsWith(v));
        if (allow_path.length == 0) {
            res.status(200).json({
                success: false,
                response: `Path ${request.path} is not allowed!`
            });
            return;
        }

        let formData = new FormData();
        request.data = JSON.parse(request.data ?? "{}")
        if(request.data)
            for(let i in request.data as any){
                formData.append(i, (request.data as any)[i])
            }
        let data = await axios.request({
            url: `${host}${request.path}`,
            method: request.method?.toLowerCase(),
            data: formData,
        });
        let api_data = await data.data as object;
        res.status(200).json({
            success: true,
            response: api_data
        });
    } catch (e: any) {
        res.status(200).json({
            success: false,
            response: "Exception occurred: " + e.toString()
        })
    }
}