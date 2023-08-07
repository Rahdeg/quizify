import { formSchema } from "@/app/(dashboard)/(routes)/quiz/components/constant";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios"
import { Question } from "@prisma/client";


export async function POST(req: Request, res: Response) {

  const baseUrl = process.env.BASE_URL;
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({error: "You must be logged in"},{ status: 401})
        }
    const body =await req.json();
    const{amount,topic,type}= formSchema.parse(body);
    const game = await prisma.game.create({
     data:{
        gameType: type,
        userId: session.user.id,
        timeStarted: new Date(),
        topic
     }
    })

    const {data} = await axios.post(`${baseUrl}/api/question`,{amount,topic,type});
    if (type === "moq") {
      type moqQuestion ={ 
        question: string,
        answer: string,
        option1: string,
        option2: string,
        option3: string
      }
      let manyData = data.questions.map((question : moqQuestion)=>{
        let options =[question.answer, question.option1, question.option2, question.option3]
        options = options.sort(()=> Math.random() - 0.5)

        return {
            question: question.question,
            answer: question.answer,
            options: JSON.stringify(options),
            gameId: game.id,
            questionType: "moq"
        }
      })
      await prisma.question.createMany({
        data: manyData
      })
    } else if (type === "open_ended") {
      interface OpenQuestion {
        question: string
        answer: string
      }
      let manyData = data.questions.map((question : OpenQuestion)=>{
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended"
        }
      })
      await prisma.question.createMany({
        data: manyData
      })
    }

    return NextResponse.json({ gameId : game.id},{status: 200})
        
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({error : error.issues},{status : 400})
      }
      return NextResponse.json({error: "Something went wrong"},{status: 500})
    }
}