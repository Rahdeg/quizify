import { prisma } from "@/lib/prismadb";


const getGames = async(gameId: string)=>{
    const game = await prisma.game.findUnique({
        where:{
            id: gameId
        },
        include:{
            questions: {
                select:{
                    id: true,
                    question: true,
                    options: true
                }
            }
        }
    })
    return game
}

export default getGames;