import {NextApiRequest, NextApiResponse} from "next";
import {formidable} from "formidable";
import {readFileSync} from "fs";

type ResponseData = {
    success: boolean,
    response: string, // 当且仅当success是false的时候才是string
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
        let [,{file: files}] = await formidable().parse(req,);
        if(files == undefined){
            throw "No file uploaded";
        }
        let file = files[0];
        let file_data = new Blob([readFileSync(file.filepath)]);
        let reqBody = new FormData();
        let token = req.cookies["token"];
        reqBody.append("token", token as string);
        reqBody.append("file", file_data, req.query["name"] as string | undefined ?? "upload.zip");

        let api_response = await fetch("https://lird.top:5001/api/user/upload", {
            method: "POST",
            body: reqBody
        }).then(e => e.json()) as {
        };
        
        res.status(200).json({
            success: true,
            response: api_response as any
        })

    } catch (e: any) {
        res.status(200).json({
            success: false,
            response: "Exception occurred: " + e.toString()
        })
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}