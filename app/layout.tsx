import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'
import { ThemeProvider } from '@/providers/theme-provider'
import NextProvider from '@/providers/next-auth-provider'
import QueryProvider from '@/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pumpfi',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(" antialiased  pt-16",inter.className)}>
        <QueryProvider>
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
        <NavBar/>
        <NextProvider>
        {children}
        <Toaster />
        </NextProvider>
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
