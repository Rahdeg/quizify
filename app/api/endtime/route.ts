import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export  async function PUT(req: Request, res: Response) {
    try {
     const session = await getAuthSession();
   
     if (!session?.user) {
       return NextResponse.json({error: "You must be logged in"},{ status: 401})
     };
   
     const body =await req.json();
     const {gameId} = body;
      await prisma.game.updateMany({
        where: {
            id: gameId
        },
        data:{
            timeEnded: new Date()
        }
      })
     return NextResponse.json("Done",{status: 200})
   }
     catch (error) {
     return NextResponse.json({error: "Something went wrong"},{status: 500})
    }
   }