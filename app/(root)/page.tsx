import SignIn from '@/components/signin'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthSession } from '@/lib/next-auth'
import {redirect} from "next/navigation"

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
   return  redirect("/dashboard")
  }
  
  return (
    <div className=' flex items-center justify-center h-full'>
      <Card className='w-[300px]'>
    <CardHeader>
      <CardTitle> Welcome to Pumpfi</CardTitle>
      <CardDescription>
        Pumpfi is quiz app that allows you to create and share quiz with your friends
      </CardDescription>
    </CardHeader>
    <CardContent>
      <SignIn text='Sign In with Google'/>
    </CardContent>
      </Card>
    </div>
  
  )
}
