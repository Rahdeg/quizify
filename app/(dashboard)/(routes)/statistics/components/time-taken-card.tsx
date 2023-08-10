import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeDate } from '@/lib/utils'
import { differenceInSeconds } from 'date-fns'
import { Hourglass } from 'lucide-react'
import React from 'react'

interface TimeTakenCardProps{
    timeEnded: Date
    timeStarted: Date
}

const TimeTakenCard = ({timeEnded,timeStarted}: TimeTakenCardProps) => {
  return (
   <Card className='md:col-span-4'>
    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-2xl font-bold'> Time Taken</CardTitle>
        <Hourglass/>
    </CardHeader>
    <CardContent>
    <div className=' text-sm font-medium'>
        {formatTimeDate(differenceInSeconds(timeEnded, timeStarted))}
    </div>
    </CardContent>

   </Card>
  )
}

export default TimeTakenCard