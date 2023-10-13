import type { NextApiRequest, NextApiResponse } from 'next'
import {NextResponse} from "next/server";



async function wait(time:number){
    return new Promise((res) => {
        setTimeout(res, time)
    });
}

type ResponseData = {
    success: boolean,
    response: object | string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await wait(1000);
    if (req.method?.toLowerCase() !== "post") {
        res.status(404).redirect("/404");
        return;
    }
    
    try {
        let reqBody = new FormData();
        let token = req.cookies["token"];
        reqBody.append("token", token as string);

        let api_response = await fetch("http://49.234.15.205:5001/api/validtoken", {
            method: "POST",
            body: reqBody
        }).then(e => e.json()) as {
            errorCode: number,
            errorMsg: string
        };

        if (api_response.errorCode === 200) {
            res.status(200).json({
                success: true,
                response: api_response
            })
        } else {
            res.status(200).json({
                success: false,
                response: api_response
            })
        }
    } catch (e: any) {
        res.status(200).json({
            success: false,
            response: "Exception occurred: " + e.toString()
        })
    }
}

