import { useEffect, useMemo } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'

export type Pointer = { x: MotionValue<number>; y: MotionValue<number> }

/** Normalised pointer position (-1..1 on each axis), smoothed with a soft spring. */
export function usePointerParallax(enabled: boolean): Pointer {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!enabled || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1)
      rawY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, rawX, rawY])

  return useMemo(() => ({ x, y }), [x, y])
}
