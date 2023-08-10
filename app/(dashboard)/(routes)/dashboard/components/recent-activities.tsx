import HistoryCard from '@/components/history-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface RecentActivitiesProps{
  userId : string
  gameCount: number
}


const RecentActivities = async ({userId , gameCount}: RecentActivitiesProps) => {

  return (
    <Card className=' col-span-4 lg:col-span-3'>
    <CardHeader>
        <CardTitle className=' text-2xl font-bold'>Recent Activities</CardTitle>
        <CardDescription>
            You have played a total of {gameCount} games
        </CardDescription>
    </CardHeader>
    <CardContent className=' max-h-[580px] overflow-y-auto'>
      <HistoryCard limit={100} userId={userId}/>
    </CardContent>
</Card>
  )
}

export default RecentActivities