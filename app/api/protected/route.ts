import { NextRequest, NextResponse } from "next/server";


export const GET = async(req: NextRequest) => {
    const user = req.headers.get('user');
    return NextResponse.json( { message: `Welcome`, user } );
}