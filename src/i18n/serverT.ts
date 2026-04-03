import en from './locales/en.json'
import bg from './locales/bg.json'

type Messages = typeof en
type Locale = keyof typeof messages
type NestedValue = string | { [key: string]: NestedValue }

const messages: Record<string, Messages> = {
  en,
  bg,
}

export function t(locale: Locale, path: string, vars?: Record<string, string>): string {
  const keys = path.split('.')

  let result: NestedValue = messages[locale] ?? messages.en

  for (const key of keys) {
    if (typeof result === 'object' && result !== null && key in result) {
      result = result[key]
    } else {
      return path
    }
  }

  if (typeof result !== 'string') {
    return path
  }

  if (vars) {
    return Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{${k}}`, v), result)
  }

  return result
}
