import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()


export async function GET(  req: NextRequest) {

    try {
        const params = await req.json()
        const { id } = params
        const user = await prisma.user.findUnique({
            where: { id }
        })

        console.log(user)
    } catch (error) {
        return NextResponse.json( { error: "Cannot fetch user at this time"})
    }
}