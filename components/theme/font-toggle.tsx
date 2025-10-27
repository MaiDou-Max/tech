"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function FontToggle() {
  const [currentFont, setCurrentFont] = React.useState('sans')

  const handleFontChange = (font: string) => {
    setCurrentFont(font)
    document.documentElement.classList.remove('font-serif', 'font-handwriting', 'font-sans')
    document.documentElement.classList.add(`font-${font}`)
    localStorage.setItem('preferred-font', font)
  }

  React.useEffect(() => {
    const savedFont = localStorage.getItem('preferred-font')
    if (savedFont) {
      handleFontChange(savedFont)
    }
  }, [])

  return (
   <div>
    <Button variant="outline" size="icon"></Button>
   </div>
  )
} 