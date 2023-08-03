import React from 'react'
import {redirect} from "next/navigation"
import { getAuthSession } from '@/lib/next-auth'

export const metadata = {
    title: "Pumpfi | History"
}

const HistoryPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/")
  }
  
  return (
    <div>HistoryPage</div>
  )
}

export default HistoryPage