import { getAuthSession } from '@/lib/next-auth'
import React from 'react'
import {redirect} from "next/navigation"
import CreateQuiz from './components/create-quiz'

export const metadata = {
    title: "Pumpfi | Pump"
}

const QuizPage = async() => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/")
  }
  return <CreateQuiz/>
}

export default QuizPage