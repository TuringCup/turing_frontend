import {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        if (!req.cookies.has("token")) {
            const url = req.nextUrl.clone()
            url.pathname = '/user/login'
            return NextResponse.redirect(url)
        } else {

            let reqBody = new FormData();
            let token = req.cookies.get("token")?.value;
            reqBody.append("token", token as string);

            let api_response = await fetch("https://lird.top:5001/api/validtoken", {
                method: "POST",
                body: reqBody
            }).then(e => e.json()) as {
                errorCode: number,
                errorMsg: string
            };

            if (api_response.errorCode === 200) {
                const url = req.nextUrl.clone()
                url.pathname = '/user/upload'
                return NextResponse.redirect(url)
            } else {
                const url = req.nextUrl.clone()
                url.pathname = '/user/login'
                return NextResponse.redirect(url)
            }
        }
    } catch (e) {
        console.error(e);
        return NextResponse.redirect("/504");
    }
}
