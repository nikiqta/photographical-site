import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

import { en } from '@payloadcms/translations/languages/en'
import { bg } from '@payloadcms/translations/languages/bg'
import { getServerSideURL } from './utilities/getURL'

export default buildConfig({
  localization: {
    locales: ['en', 'bg'],
    defaultLocale: 'bg',
  },
  i18n: {
    supportedLanguages: {
      en,
      bg,
    },
    fallbackLanguage: 'en',
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    dateFormat: 'dd.MM.yyyy',
    //@ts-expect-error todo revisit later
    locale: 'bg',
    locales: ['bg', 'en'],
    meta: {
      titleSuffix: 'BGAIR',
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    timezones: {
      supportedTimezones: [
        {
          label: 'Europe/Athens',
          value: 'Europe/Athens',
        },
      ],
      defaultTimezone: 'Europe/Athens',
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  email: nodemailerAdapter({
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    }),
    defaultFromAddress: process.env.EMAIL_INBOX || process.env.EMAIL_USERNAME || '',
    defaultFromName: 'Ivan Ivanov',
  }),
  cors: [
    getServerSideURL(),
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean) as string[],
  sharp,
  plugins: [],
})
