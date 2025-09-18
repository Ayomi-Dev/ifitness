import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()
export const GET =  async function(req: NextRequest) {
    try {
        const user = await prisma.user.findMany({
            where: { isAdmin: false}
        })

        return NextResponse.json(
            {user}, {status: 201}
        )
    } catch (error) {
        console.log(error)
        NextResponse.json({ error: "Something went wrong"}, {status: 500})
    }
}