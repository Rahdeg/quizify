import { getServerSession } from "next-auth"
import { prisma } from "./prismadb";
import { getAuthSession } from "./next-auth";



export const setEndTime =async(gameId : string)=>{
    const session = await getAuthSession();

    if (!session?.user) {
        return 
    };

     await prisma.game.update({
        where:{
            id: gameId
        },
        data:{
            timeEnded: new Date(),
        },
    })
}