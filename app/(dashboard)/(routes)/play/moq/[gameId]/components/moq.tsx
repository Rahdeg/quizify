"use client"
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Game, Question } from '@prisma/client'
import { ChevronRight, Loader2, Timer } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import MoqCounter from './moq-counter'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { checkAnswerSchema } from '@/app/(dashboard)/(routes)/quiz/components/constant'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'



interface MoqProps{
    game: Game & {questions:Pick< Question, "id" | "options" | "question">[]}
}

const Moq = ({game}: MoqProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [wrongAnswer, setWrongAnswer] = useState<number>(0)
  const [hasEnded, setHasEnded] = useState<boolean>(false)

  const currentQuestion = React.useMemo(()=>{
    return game.questions[questionIndex]
  },[questionIndex,game])

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const {mutate: checkAnswer, isLoading: isChecking} = useMutation({
    mutationFn:async () => {
      const payload: z.infer<typeof checkAnswerSchema>={
        questionId: currentQuestion.id,
        userAnswer: options[selectedChoice]
      }
      const {data} = await axios.post("/api/checkAnswer", payload);
      return data;
    }
  })

  const handleNext = useCallback(()=>{
    if(isChecking) return
    checkAnswer(undefined,{
      onSuccess:({isCorrect})=>{
        if (isCorrect) {
          toast({
            title: "Correct",
            description:"Correct answer",
            variant: "success"
          })
          setCorrectAnswer((prev)=> prev + 1)
        }else {
          toast({
            title: "Incorrect",
            description:"Incorrect answer",
            variant: "destructive"
          })
          setWrongAnswer((prev)=> prev + 1)
        }
        if (questionIndex === game.questions.length -1) {
          setHasEnded(true)
          return
        }
        setQuestionIndex((prev)=> prev + 1)
      }
    })
  },[checkAnswer,questionIndex,game.questions.length, isChecking])

  useEffect(() => {
    document.addEventListener("keydown", event =>{
      if (event.key === "1") {
        setSelectedChoice(0);
      }else if (event.key === "2") {
        setSelectedChoice(1);
      }else if (event.key === "3") {
        setSelectedChoice(2);
      }else if (event.key === "4") {
        setSelectedChoice(3);
      }else if (event.key === "Enter") {
        handleNext();
      }
    })
    return ()=> {
      document.removeEventListener("keydown", ()=>{})
    }
  
  }, [handleNext])
  

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
0.00
</div>

        </div>
        <MoqCounter wrongAnswer={wrongAnswer} correctAnswer={correctAnswer}/>
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
      {
        options && options.map((option,index)=>{
          return (
            <Button onClick={()=>setSelectedChoice(index)} key={index} variant={selectedChoice === index? "default" : "secondary"} className=' justify-start w-full py-8 mb-4'>
              <div className=' flex items-center justify-start'>
                <div className='p-2 px-3 mr-5 border rounded-md'>
                  {index + 1}
                </div>
                <div className=' text-start'>{option} </div>
              </div>
            </Button>
          )
        })
      }
      <Button className='mt-2'  onClick={()=> handleNext()} disabled={isChecking}>
        {isChecking && <Loader2 className='m-4 h-4 mr-2 animate-spin'/>}
        Next <ChevronRight className=' ml-3 w-4 h-4'/>
      </Button>
    </div>
    </div>
  )
}

export default Moq