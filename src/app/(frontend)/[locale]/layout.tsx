import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import '@mantine/core/styles.css'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { isEnabled } = await draftMode()

  const { locale } = await params

  // Ensure that the incoming `locale` is valid and supported by the application
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for the correct locale
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      {...mantineHtmlProps}
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {isEnabled ? (
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
            ) : null}

            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
