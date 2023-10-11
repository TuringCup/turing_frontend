import {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function GET(req: NextRequest){
    if(!req.cookies.has("token")) {
        const url = req.nextUrl.clone()
        url.pathname = '/user/login'
        return NextResponse.redirect(url)
    }else{
        const url = req.nextUrl.clone()
        url.pathname = '/user/upload'
        return NextResponse.redirect(url)
    }
}