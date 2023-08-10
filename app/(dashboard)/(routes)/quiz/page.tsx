import { getAuthSession } from '@/lib/next-auth'
import React from 'react'
import {redirect} from "next/navigation"
import CreateQuiz from './components/create-quiz'

export const metadata = {
    title: "Pumpfi | Pump"
}

interface QuizPageProps{
  searchParams:{
    topic?: string
  }
}

const QuizPage = async({searchParams}: QuizPageProps) => {
  const session = await getAuthSession();


  if (!session?.user) {
    return redirect("/")
  }
  return <CreateQuiz topicParams={searchParams?.topic ?? ''}/>
}

export default QuizPage