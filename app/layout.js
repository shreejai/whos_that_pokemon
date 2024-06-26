import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokemon Guessing Game',
  description: 'A Next.js Project by SJCODES.COM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel='icon' href='/pokeball.ico'/>
    </head>
      <body className={`inter.className bg-gradient`}>{children}</body>
    </html>
  )
}
