import { defineRouting } from 'next-intl/routing'

export default defineRouting({
    defaultLocale: 'bg',
    localePrefix: 'always',
    locales: ['bg', 'en'],
})
