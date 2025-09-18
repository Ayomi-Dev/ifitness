import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { PrismaClient } from "../../../generated/prisma";
import { signToken } from "../../../../lib/jwt";




const prisma = new PrismaClient();
export const POST =  async (req:NextRequest) => {

    try{
        const body = await req.json();

        const { email, password} = body;

        if(!email || !password){
            return NextResponse.json(
                { error: "Email mand password required"}
            )
        }

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return NextResponse.json(
                {error: "User not found"}, { status: 404 }
            )
        }

       
        const validPassword = await bcrypt.compare(password, user.password); //compares password from request with saved in database
        if(!validPassword){
            return NextResponse.json(
                { error: "Password incorrect"}, { status: 404 }
            );
        }

        if(!process.env.JWT_SECRET){
            return NextResponse.json(
                {
                error: "No JWT_SECRET defined"
            }, { status: 401}
        );
        }

        const payload = {id: user.id, name: user.name, isAdmin: user.isAdmin}
        const token = signToken( payload )  //assings token to object passed in  i.e user details passed in

        const response =  NextResponse.json( { success: true, 
            user: payload 
        });

        response.cookies.set('token', token, { //stores token in cookies using httpOnly for safer security
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/',
            maxAge: 60 * 60
        });
        return response;
    }
    catch(error){
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong"}, { status: 500 }
        )
    }
}