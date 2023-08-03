import { getAuthSession } from '@/lib/next-auth'
import React from 'react'
import {redirect} from "next/navigation"
import DashboardCard from '@/app/(dashboard)/(routes)/dashboard/components/dashboard-card'
import { BrainCircuit, History } from 'lucide-react'
import HotTopicCard from './components/hot-topic-card'
import RecentActivities from './components/recent-activities'

interface DashboardPageProps{

}

export const metadata ={
    title: "Dashboard | Pumpfi"
}

const DashboardPage = async (props : DashboardPageProps) => {
    const session = await getAuthSession();

    if (!session?.user) {
     return redirect("/")
    }
  return (
    <main className='p-8 mx-auto max-w-7xl'>
        <div className='flex items-center'>
            <h2 className='mr-2 text-3xl font-bold tracking-tight'>Dashboard</h2>
        </div>
        <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <DashboardCard title='Pump Me' description='Challenge yourself with a quiz' icon={BrainCircuit} route='quiz'/>
        <DashboardCard title='History' description='View past quiz attempt' icon={History} route='history'/>
        </div>
        <div className='grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7'>
          <HotTopicCard/>
          <RecentActivities/>
        </div>
    </main>
  )
}

export default DashboardPage