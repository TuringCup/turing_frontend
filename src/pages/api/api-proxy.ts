import type { NextApiRequest, NextApiResponse } from 'next'

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
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

        let data = await fetch(`${host}${request.path}`,{
            method: request.method,
            body: request.data && JSON.stringify(request.data)
        });
        let api_data = await data.json() as object;
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