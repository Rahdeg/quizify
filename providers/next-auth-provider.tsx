import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface NextProviderProps{
    children: React.ReactNode
}

const NextProvider = ({children}: NextProviderProps) => {
  return (
    <SessionProvider>
       {children}
    </SessionProvider>
  )
}

export default NextProvider