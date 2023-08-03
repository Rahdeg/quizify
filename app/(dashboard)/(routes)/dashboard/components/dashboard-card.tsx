
import { LucideIcon } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import Link from 'next/link';


interface DashboardCardProps{
    route: string
    title: string
    description: string;
    icon: LucideIcon; 
}

const DashboardCard = ({route,title,description,icon:Icon}: DashboardCardProps) => {
    

  return (
    <Link href={`/${route}`}>
     <Card className=' hover:cursor-pointer hover:opacity-75' >
        
    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className=' text-2xl font-bold'>{title}</CardTitle>
       { <Icon size={28} strokeWidth={2.5}/>}
    </CardHeader>
    <CardContent>
        <p className=' text-sm text-muted-foreground'>
          {description}
        </p>
    </CardContent>
</Card>
        </Link>
   
  )
}

export default DashboardCard