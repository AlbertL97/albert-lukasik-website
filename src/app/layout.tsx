import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Albert Łukasik — Cognitive Scientist & UX Researcher',
    template: '%s | Albert Łukasik',
  },
  description:
    'PhD Researcher, VR Educator, and UX Researcher working at the intersection of cognitive science, neuroscience, and human-computer interaction.',
  keywords: [
    'UX research',
    'cognitive science',
    'VR education',
    'neuroscience',
    'human-computer interaction',
    'PhD researcher',
    'Albert Łukasik',
  ],
  authors: [{ name: 'Albert Łukasik', url: 'https://albert-lukasik.vercel.app' }],
  creator: 'Albert Łukasik',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://albert-lukasik.vercel.app',
    siteName: 'Albert Łukasik',
    title: 'Albert Łukasik — Cognitive Scientist & UX Researcher',
    description:
      'PhD Researcher, VR Educator, and UX Researcher working at the intersection of cognitive science, neuroscience, and human-computer interaction.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albert Łukasik — Cognitive Scientist & UX Researcher',
    description:
      'PhD Researcher, VR Educator, and UX Researcher working at the intersection of cognitive science, neuroscience, and human-computer interaction.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
