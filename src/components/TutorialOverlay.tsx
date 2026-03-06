import { useEffect, useRef, useState, useCallback } from 'react'
import { useTutorial } from '@/lib/tutorial'

interface HighlightRect {
  top: number
  left: number
  width: number
  height: number
}

const PADDING = 10
const CALLOUT_WIDTH = 340
const CALLOUT_EST_HEIGHT = 210

export function TutorialOverlay() {
  const { isActive, currentStep, steps, next, back, close, finish } = useTutorial()
  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const [rect, setRect] = useState<HighlightRect | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const measureTarget = useCallback(() => {
    if (!step) return
    const el = document.querySelector(step.targetSelector)
    if (!el) {
      setRect(null)
      return
    }
    const r = el.getBoundingClientRect()
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [step])

  // Scroll to element and measure on step change
  useEffect(() => {
    if (!isActive || !step) return
    const el = document.querySelector(step.targetSelector)
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
        block: 'center',
      })
    }
    // Measure after scroll settles
    const timeout = setTimeout(measureTarget, prefersReducedMotion ? 0 : 400)
    return () => clearTimeout(timeout)
  }, [isActive, currentStep, step, prefersReducedMotion, measureTarget])

  // Re-measure on resize / scroll
  useEffect(() => {
    if (!isActive) return
    window.addEventListener('resize', measureTarget)
    window.addEventListener('scroll', measureTarget, { passive: true })
    return () => {
      window.removeEventListener('resize', measureTarget)
      window.removeEventListener('scroll', measureTarget)
    }
  }, [isActive, measureTarget])

  // Keyboard: Esc → close
  useEffect(() => {
    if (!isActive) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isActive, close])

  // Focus trap within dialog
  useEffect(() => {
    if (!isActive || !dialogRef.current) return
    const el = dialogRef.current
    const focusables = Array.from(
      el.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (focusables.length === 0) {
        e.preventDefault()
        return
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isActive, currentStep])

  // Move focus into dialog when step changes
  useEffect(() => {
    if (isActive && firstFocusableRef.current) {
      firstFocusableRef.current.focus()
    }
  }, [isActive, currentStep])

  if (!isActive || !step) return null

  // --- Spotlight geometry ---
  const hlTop = rect ? rect.top - PADDING : 0
  const hlLeft = rect ? rect.left - PADDING : 0
  const hlWidth = rect ? rect.width + PADDING * 2 : 0
  const hlHeight = rect ? rect.height + PADDING * 2 : 0

  // --- Callout position ---
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cw = Math.min(CALLOUT_WIDTH, vw - 32)
  let calloutTop: number
  let calloutLeft: number

  if (rect) {
    calloutLeft = Math.max(16, Math.min(vw - cw - 16, hlLeft + hlWidth / 2 - cw / 2))
    const spaceBelow = vh - (hlTop + hlHeight)
    if (spaceBelow >= CALLOUT_EST_HEIGHT + 16) {
      calloutTop = hlTop + hlHeight + 12
    } else {
      calloutTop = Math.max(16, hlTop - CALLOUT_EST_HEIGHT - 12)
    }
  } else {
    calloutTop = vh / 2 - CALLOUT_EST_HEIGHT / 2
    calloutLeft = vw / 2 - cw / 2
  }

  return (
    <>
      {/* Dim backdrop via box-shadow on spotlight box */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: rect ? hlTop : 0,
          left: rect ? hlLeft : 0,
          width: rect ? hlWidth : '100%',
          height: rect ? hlHeight : '100%',
          borderRadius: 8,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
          border: rect ? '2px solid #00ff41' : 'none',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />

      {/* Callout dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Tutorial step ${currentStep + 1} of ${steps.length}: ${step.title}`}
        style={{
          position: 'fixed',
          top: calloutTop,
          left: calloutLeft,
          width: cw,
          zIndex: 9999,
          outline: 'none',
        }}
        className="bg-black border-2 border-green-400 rounded-lg p-4 font-mono shadow-2xl shadow-green-900/50"
      >
        {/* Step indicator */}
        <div className="text-green-500/60 text-xs mb-1 tracking-wider">
          STEP {currentStep + 1} / {steps.length}
        </div>

        <h2 className="text-green-400 font-bold text-sm mb-2 leading-snug">
          {step.title}
        </h2>

        <p className="text-green-300/80 text-xs mb-3 leading-relaxed">
          {step.body}
        </p>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-3" aria-hidden="true">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full ${
                i === currentStep
                  ? 'bg-green-400 w-4'
                  : i < currentStep
                  ? 'bg-green-700 w-1.5'
                  : 'bg-white/20 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Skip / Close */}
          <button
            ref={firstFocusableRef}
            onClick={close}
            className="text-xs text-white/40 hover:text-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 px-1 py-1 rounded transition-colors"
          >
            [skip]
          </button>

          <div className="flex gap-2 ml-auto">
            {!isFirst && (
              <button
                onClick={back}
                className="text-xs px-3 py-1.5 rounded border border-white/20 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 transition-colors"
              >
                ← Back
              </button>
            )}
            {!isLast ? (
              <button
                onClick={next}
                className="text-xs px-3 py-1.5 rounded bg-green-700 hover:bg-green-600 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-400 transition-colors font-bold"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={finish}
                className="text-xs px-3 py-1.5 rounded bg-green-700 hover:bg-green-600 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-400 transition-colors font-bold"
              >
                Finish ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
