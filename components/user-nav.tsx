"use client"
import { User } from 'next-auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import UserAvater from './user-avatar'
import Link from 'next/link'
import {signOut} from "next-auth/react"
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'


interface UserNavProps{
    user : Pick<User, "email" | "image" | "name">
}

const UserNav = ({user}: UserNavProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvater user={user}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' bg-white' align='end'>
            <div className=' flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-1 leading-none'>
                    {
                        user.name && <p className=' font-medium'> {user.name}</p>
                    }
                    {
                        user.email && (<p className=' w-[200px] truncate text-sm text-zinc-700'> {user.email}</p>)
                    }
                </div>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
                <Link href='/'>
                    Raheem
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem  onClick={(e)=>{
                e.preventDefault()
                 signOut().catch(console.error)}}>
                <Button variant='destructive' className=''>
                Sign Out
                <LogOut className='w-4 h-4 ml-3'/>
                </Button>
            </DropdownMenuItem>
                   
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav