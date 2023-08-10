import { Table, TableBody, TableCaption,  TableCell,  TableHead,  TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Question } from '@prisma/client'
import React from 'react'

interface QuestionListProps{
    question : Question[]
}

const QuestionList = ({question}: QuestionListProps) => {
    let gameType = question[0].questionType;

  return (
    <Table className='mt-4'>
        <TableCaption> End of list.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='w-[10px]'>No.</TableHead>
                <TableHead className=''>Question & Correct Answer</TableHead>
                <TableHead className=''>Your Answer</TableHead>
                {
                    gameType === "open_ended" && (
                        <TableHead className='w-[10px] text-right'>Accuracy</TableHead>
                    )
                }
            </TableRow>
        </TableHeader>
        <TableBody>
            <>
            {
                question.map((question, index)=>{
                    return (
                        <TableRow key={question.id}>
                        <TableCell className=' font-medium'>{index + 1}</TableCell>
                        <TableCell>
                        {question.question} 
                        <br/>
                        <br/>
                        <span className=' font-semibold'> { question.answer}</span>
                        </TableCell>
                        {
                            gameType === "moq" && (
                                <TableCell className={cn("", question.isCorrect ? "text-green-600":"text-red-600")}>
                                    {question.userAnswer}
                                </TableCell>
                            )
                        }
                        {
                            gameType ==="open_ended" && (
                                <TableCell>
                                    {question.userAnswer}
                                </TableCell>
                            )
                        }
                       {
                         gameType ==="open_ended" && (
                            <TableCell className=' text-right'>
                                    {question.percentageCurrent}
                            </TableCell>
                         )
                       }
                    </TableRow>
                    )
                })
            }
            </>
        </TableBody>
    </Table>
  )
}

export default QuestionList