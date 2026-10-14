'use client'

import { useEffect, useState } from 'react'

// True only on devices with a precise, hover-capable pointer (mouse/trackpad).
// Cursor-only effects (tilt, magnetic pull) are gated on this so touch
// devices never get "stuck" hover states.
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setIsFine(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isFine
}
