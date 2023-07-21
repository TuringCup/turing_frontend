
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {config} from "@/config/config";
import {Content} from "@/app/Content";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Content elements={children}/>
      </body>
    </html>
  )
}
