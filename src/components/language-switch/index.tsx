'use client'

import { Link } from '@/i18n/navigation'
import { Button, Text } from '@mantine/core'
import { useLocale } from 'next-intl'
import { useSelectedLayoutSegments } from 'next/navigation'
import Flag from 'react-flagpack'
import { useMediaQuery } from '@mantine/hooks'

export default function LanguageSwitch() {
  const locale = useLocale()
  const segments = useSelectedLayoutSegments()
  const path = segments.join('/') || ''

  const isEnglish = locale === 'en'
  const isMobile = useMediaQuery('(max-width: 768px)')
  const enLabel = isMobile ? 'English' : 'EN'
  const bgLabel = isMobile ? 'Bulgarian' : 'BG'

  return (
    <Button
      aria-label={isEnglish ? 'Switch language to Bulgarian' : 'Switch language to English'}
      color="dark"
      component={Link}
      fw={700}
      href={`/${path}`}
      lh="normal"
      locale={isEnglish ? 'bg' : 'en'}
      lts="0.04px"
      p={'0 0.2rem'}
      variant="subtle"
      bdrs={'2rem'}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <span aria-hidden="true">
        <Flag code={isEnglish ? 'BG' : 'GB-UKM'} size="m" />
      </span>
      <Text c="gray" fw="700" ml="xs" size="md">
        {isEnglish ? bgLabel : enLabel}
      </Text>
    </Button>
  )
}
