import {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function GET(req: NextRequest){
    const url = req.nextUrl.clone()
    url.pathname = '/user/login'
    return NextResponse.redirect(url)
}