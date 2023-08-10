import { buttonVariants } from '@/components/ui/button'
import { prisma } from '@/lib/prismadb'
import { LucideLayoutDashboard } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import ResultCard from '../components/result-card'
import AccuracyCard from '../components/accuracy-card'
import TimeTakenCard from '../components/time-taken-card'
import QuestionList from '../components/question-list'

interface StatisticsPageProps{
    params : {
        gameId: string
    }
}

const StatisticsPage = async ({params:{gameId}}: StatisticsPageProps) => {

  const session = await getServerSession();
  if (!session?.user) {
    return redirect("/")
  }

  const game = await prisma.game.findUnique({
    where:{
      id: gameId
    },
    include:{
      questions: true
    }
  })

  if (!game) {
    return redirect("/quiz")
  }

  let accuracy: number = 0

  if (game.gameType === "moq") {
    let totalCorrect = game.questions.reduce((acc,question)=>{
      if(question.isCorrect){
        return acc + 1
      }
      return acc
    },0);
    accuracy = (totalCorrect/ game.questions.length) * 100;
  } else if (game.gameType === 'open_ended'){
    let totalPercentage = game.questions.reduce((acc,question)=>{
      return acc + (question.percentageCurrent || 0)
    },0);
    accuracy = (totalPercentage/ game.questions.length) 
  }

  accuracy = Math.round(accuracy * 100) / 100;

  
  return (
    <>
    <div className='p-8 max-auto max-w-7xl'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className=' text-3xl font-bold tracking-tight'>Statistics</h2>
          <div className='flex items-center space-x-2'>
            <Link href='/dashboard' className={buttonVariants()}>
              <LucideLayoutDashboard className='mr-2 h-4 w-4'/>
            Back to Dashboard
            </Link>
          </div>
        </div>
        <div className='grid gap-4 mt-4 md:grid-cols-7'>
          <ResultCard accuracy={accuracy}/>
          <AccuracyCard accuracy={accuracy}/>
          <TimeTakenCard timeStarted={game.timeStarted} timeEnded={new Date}/>
        </div>
        <QuestionList question={game.questions}/>
    </div>
    </>
  )
}

export default StatisticsPage