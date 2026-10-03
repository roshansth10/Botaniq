import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { LenisProvider } from '@/components/lenis-provider'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Botaniq | Premium Botanical Skincare',
  description: 'Discover science-backed skincare crafted from pure botanical ingredients. Where nature touches skin.',
  keywords: ['skincare', 'botanical', 'natural', 'luxury', 'beauty', 'organic'],
  authors: [{ name: 'Botaniq' }],
  openGraph: {
    title: 'Botaniq | Premium Botanical Skincare',
    description: 'Discover science-backed skincare crafted from pure botanical ingredients.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#C97B63',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster position="top-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
