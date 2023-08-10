import { checkAnswerSchema } from "@/app/(dashboard)/(routes)/quiz/components/constant";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { stringSimilarity } from "string-similarity-js";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const {questionId,userAnswer} = checkAnswerSchema.parse(body);
        const question = await prisma.question.findUnique({
            where:{
                id: questionId
            }
        });

        if (!question) {
            return NextResponse.json({ error: "Question not found"},{status: 404})
        };

        await prisma.question.update({
            where:{
                id: questionId
            },
            data:{
                userAnswer
            }
        })
    
        if (question.questionType === "moq") {
            const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
            await prisma.question.update({
                where:{
                    id: questionId
                },
                data:{
                    isCorrect
                }
            });
            return NextResponse.json({isCorrect},{status: 200});
        } else if (question.questionType === 'open_ended'){
            let percentageSimilar = stringSimilarity(userAnswer.toLowerCase().trim(), question.answer.toLowerCase().trim());
            percentageSimilar = Math.round(percentageSimilar * 100);
            await prisma.question.update({
                where:{id : questionId},
                data:{percentageCurrent : percentageSimilar }
            })
            return NextResponse.json({percentageSimilar},{ status: 200})
        }

        
        
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({error: error.issues},{ status: 400})
        }
    }
}