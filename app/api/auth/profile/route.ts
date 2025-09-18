import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/jwt";



export const GET = async( req: NextRequest) => {
    try {
        const token = req.cookies.get('token')?.value;

        if(!token){
            NextResponse.json(
                { error: "Unauthorised request!"},
                { status: 401}
            )
        }

        const decoded = verifyToken(token);
        if(!decoded){
            NextResponse.json(
                { error: "Invalid or expired token!"},
                { status: 401}
            )
        }

        return NextResponse.json(
            { user: decoded},
            { status: 200}
        )

        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong"},
            { status: 500 }
        )
    }
        
 
}