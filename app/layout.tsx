import type { Metadata } from 'next'
import { Bricolage_Grotesque, Newsreader, Space_Mono } from 'next/font/google'
import './globals.css'

// Headings — a modern, characterful sans
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

// Body — a clean, readable serif (with italics for emphasis)
const body = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

// Labels, captions, metadata — a typewriter-style mono
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Divijaa Arjun 😎',
  description:
    'Portfolio of Divijaa Arjun, a frontend developer and UI/UX designer building purposeful, intuitive digital experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased bg-[#efe9dd] text-[#2c2824]`}
      >
        {children}
      </body>
    </html>
  )
}
