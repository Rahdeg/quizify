import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'
import { ThemeProvider } from '@/providers/theme-provider'

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
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
        <NavBar/>
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
