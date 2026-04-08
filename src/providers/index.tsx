'use client'

import React, { useEffect } from 'react'
import { createTheme, MantineProvider, useComputedColorScheme } from '@mantine/core'

const theme = createTheme({
  /** Put your mantine theme override here */
})

const ThemeAttributeSync: React.FC = () => {
  const colorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme)
  }, [colorScheme])

  return null
}

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <ThemeAttributeSync />
      {children}
    </MantineProvider>
  )
}
