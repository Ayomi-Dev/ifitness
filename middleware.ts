import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";



export const middleware = ( req: NextRequest) => {
    console.log("midlleware hit")
    const { pathname } = req.nextUrl

    if(pathname.startsWith('/api/protected')) {
        const token = req.cookies.get("token")?.value

        if(!token){
            NextResponse.json( {error: "Unauthorised!"}, { status: 401})
        }

        const decoded = verifyToken(token);
        if(!decoded){
            NextResponse.json(
                { error: "Invalid or expired token!"}, 
                { status: 401}
            )
        }

        const reqHeaders = new Headers(req.headers); //attaches user info to the request headers
        reqHeaders.set("user", JSON.stringify(decoded));

        return NextResponse.json(
            {request:
                { headers: reqHeaders}
            }
        )
    }
    return NextResponse.next();
}

export const config =  {
    matcher: ['/api/users/:path*']
}