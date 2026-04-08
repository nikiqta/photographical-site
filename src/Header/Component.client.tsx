'use client'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import NavigationLink from '@/components/NavigationLink'
import LanguageSwitch from '@/components/language-switch'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="container relative z-20   ">
      <div className="py-8 flex justify-between">
        <NavigationLink href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </NavigationLink>
        <HeaderNav data={data} />
        <LanguageSwitch />
      </div>
    </header>
  )
}
