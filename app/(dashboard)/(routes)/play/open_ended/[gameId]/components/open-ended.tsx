"use client"
import {differenceInSeconds} from "date-fns"
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Game, Question } from '@prisma/client'
import { BarChart, ChevronRight, Loader2, Timer } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { checkAnswerSchema } from '@/app/(dashboard)/(routes)/quiz/components/constant'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { cn, formatTimeDate } from '@/lib/utils'
import BlanckAnswerInput from "./blanck_answer_input"
import { setEndTime } from "@/lib/set-ended-time"
interface OpenEndedProps{
    game: Game & {questions:Pick< Question, "id" | "answer" | "question">[]}
}

const OpenEnded = ({ game}: OpenEndedProps) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<number>(0);
    const [hasEnded, setHasEnded] = useState<boolean>(false)
    const [now, setNow] = useState<Date>(new Date());
    const [blankAnswer, setBlankAnswer] = useState<string>('')
    const{toast} = useToast();
  
    useEffect(() => {
     const interval = setInterval(()=>{
      if (!hasEnded) {
        setNow(new Date());
      }
     },1000);
  
     return ()=>{
      clearInterval(interval);
     }
    
     
    }, [hasEnded]);
    
  
    const currentQuestion = React.useMemo(()=>{
      return game.questions[questionIndex]
    },[questionIndex,game])
  
  
  
    const {mutate: checkAnswer, isLoading: isChecking} = useMutation({
      mutationFn:async () => {
        let filledAnswer= blankAnswer
        document.querySelectorAll("#user-blank-input").forEach((input: any) =>{
          filledAnswer = filledAnswer.replace("_____", input.value);
          input.value ="";
        })
        const payload: z.infer<typeof checkAnswerSchema>={
          questionId: currentQuestion.id,
          userAnswer: filledAnswer
        }
        const {data} = await axios.post("/api/checkAnswer", payload);
        return data;
      }
    })

    // const updateEndTime = useCallback(async()=>{
    //   await axios.put("/api/endtime", game.id)
    // },[game.id])
  
   
    const handleNext = useCallback(()=>{
      if(isChecking) return
      checkAnswer(undefined,{
        onSuccess:({percentageSimilar})=>{
          toast({
            title: `Your answer is ${percentageSimilar}% similar to the correct answer`,
            description:"answers are matched based on similarity comparisons",
            variant: "success"
          });
          if (questionIndex === game.questions.length -1) {
           
            setHasEnded(true)
            return
          }
          setQuestionIndex((prev)=> prev + 1)
        }
      })
    },[checkAnswer,toast,questionIndex,game.questions.length, isChecking])
  
    useEffect(() => {
      document.addEventListener("keydown", event =>{
        if (event.key === "Enter") {
          handleNext();
        }
      })
      return ()=> {
        document.removeEventListener("keydown", ()=>{})
      }
    
    }, [handleNext])
    
    if (hasEnded) {
      return (
        <div className='absolute flex flex-col justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-normal'>
          You completed in {formatTimeDate(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link href={`/statistics/${game.id}`} className={cn(buttonVariants(), "mt-3")}>
        View Statistics
        <BarChart className='w-4 h-4 ml-2'/>
        </Link>
      </div>
      )
    }
    
  
    return (
      <div className='absolute -translate-x-1/2 -translate-y-1/2 mt-16  md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
    {/* topic */}
<p className=' space-x-2'>
  <span className=' text-slate-400'>Topic</span>
  <span className='px-2 py-1 text-white rounded-lg bg-slate-800'>{game.topic} </span>
</p>
<div className='flex self-start mt-3 text-slate-400'>
<Timer className="mr-2"/>
{formatTimeDate(differenceInSeconds(now, game.timeStarted))}
</div>

        </div>
       
      </div>
    <Card className=' w-full mt-4'>
      <CardHeader className='flex flex-row items-center'>
      <CardTitle className='mr-5 text-center divide-y divide-zinc-600/50'>
      <div> {questionIndex + 1}</div>
      <div className='text-base text-slate-400'>
          { game.questions.length}
      </div>
      </CardTitle>
      <CardDescription className='flex-grow text-lg'>
          {currentQuestion.question}
      </CardDescription>
      </CardHeader>
    </Card>
    <div className='flex flex-col items-center gap-4 justify-center mt-4 w-full'>
      <BlanckAnswerInput answer={currentQuestion.answer} setBlankAnswer={setBlankAnswer}/>
  
      <Button className='mt-2'  onClick={()=> handleNext()} disabled={isChecking}>
        {isChecking && <Loader2 className='m-4 h-4 mr-2 animate-spin'/>}
        {hasEnded? "Submit" : "Next"} <ChevronRight className=' ml-3 w-4 h-4'/>
      </Button>
    </div>
    </div>
    )
}

export default OpenEnded