import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'


const RecentActivities = () => {
  return (
    <Card className=' col-span-4 lg:col-span-3'>
    <CardHeader>
        <CardTitle className=' text-2xl font-bold'>Recent Activities</CardTitle>
        <CardDescription>
            You have played a total of 10 games
        </CardDescription>
    </CardHeader>
    <CardContent className=' max-h-[580px] overflow-y-auto'>
       Histories
    </CardContent>
</Card>
  )
}

export default RecentActivities