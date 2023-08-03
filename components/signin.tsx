"use client"
import React from 'react'
import { Button } from './ui/button'
import {signIn} from "next-auth/react"

interface SignInProps{
    text: string
}

const SignIn = ({text}: SignInProps) => {
  return (
    <Button onClick={()=>{signIn("google").catch(console.error)}}>
        {text}
    </Button>
  )
}

export default SignIn