import React from 'react'
import {redirect} from "next/navigation"
import { getAuthSession } from '@/lib/next-auth'
import HistoryCard from '@/components/history-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { LucideLayoutDashboard } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export const metadata = {
    title: "Pumpfi | History"
}

const HistoryPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/")
  }
  
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[500px]'>
     <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className=' text-2xl font-bold'> History</CardTitle>
          <Link href='/dashboard' className={buttonVariants()}>
            <LucideLayoutDashboard className='mr-2'/>
            Back to Dashboard
          </Link>
        </div>
      </CardHeader>
      <CardContent className=' max-h-[60vh] overflow-scroll'>
      <HistoryCard limit={100} userId={session.user.id}/>
      </CardContent>
     </Card>
    </div>
  )
}

export default HistoryPage