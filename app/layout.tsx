import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'

const open_sans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord Chat Application',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(open_sans.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            storageKey='discord-theme'
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
