import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  defaultLocale: 'bg',
  localePrefix: 'always',
  locales: ['bg', 'en'],
})
