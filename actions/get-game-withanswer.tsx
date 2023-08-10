import { prisma } from "@/lib/prismadb";


const getOpenGames = async(gameId: string)=>{
    const game = await prisma.game.findUnique({
        where:{
            id: gameId
        },
        include:{
            questions: {
                select:{
                    id: true,
                    question: true,
                    options: true,
                    answer: true
                }
            }
        }
    })
    return game
}

export default getOpenGames;