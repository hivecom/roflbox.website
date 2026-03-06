import { createContext, useContext, useState, useCallback } from 'react'

export interface TutorialStep {
  id: string
  title: string
  body: string
  targetSelector: string
  placement: 'top' | 'bottom'
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'hero',
    title: '👋 Welcome to ROFLBOX!',
    body: 'ARE YOU NOOB? WANT TO BE PRO? This is the legendary ROFLBOX – the totally legit ultimate h4x toolkit. Let us guide you through its many "features"!',
    targetSelector: '#tutorial-hero',
    placement: 'bottom',
  },
  {
    id: 'terminal',
    title: '🖥️ Elite Hacker Terminal 9000™',
    body: 'Our state-of-the-art terminal hacks the mainframe in real time. Watch as it downloads more RAM and bypasses firewalls using a GUI interface! Very secure. Much wow.',
    targetSelector: '#tutorial-terminal',
    placement: 'bottom',
  },
  {
    id: 'features',
    title: '🔥 The H4X Suite',
    body: 'Choose from our premium totally-not-fake tools: Aimbot 9000, SpeedHax, and WallHax. Not detected by any antivirus. Results may vary (i.e., not at all).',
    targetSelector: '#tutorial-features',
    placement: 'top',
  },
  {
    id: 'counter',
    title: '💯 Skill Counter 3000™',
    body: 'Track your 1337 skillz with our patented Skill Counter. Click +1 SKILL to grow up from noob to pro. Backed by science. Nobel prize pending.',
    targetSelector: '#tutorial-counter',
    placement: 'top',
  },
  {
    id: 'testimonials',
    title: '💬 Real Reviews from Real Pros',
    body: "These are 100% genuine testimonials from verified pro gamers and definitely not made-up usernames. Over 3 satisfied customers worldwide. Install now!",
    targetSelector: '#tutorial-testimonials',
    placement: 'top',
  },
]

const STORAGE_KEY = 'roflbox.tutorialCompleted'

export interface TutorialContextValue {
  isActive: boolean
  currentStep: number
  steps: TutorialStep[]
  completed: boolean
  start: () => void
  next: () => void
  back: () => void
  close: () => void
  finish: () => void
}

export const TutorialContext = createContext<TutorialContextValue | null>(null)

export function useTutorialState() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true'
  )

  const start = useCallback(() => {
    setCurrentStep(0)
    setIsActive(true)
  }, [])

  const next = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, TUTORIAL_STEPS.length - 1))
  }, [])

  const back = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }, [])

  const close = useCallback(() => {
    setIsActive(false)
  }, [])

  const finish = useCallback(() => {
    setIsActive(false)
    setCompleted(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  return { isActive, currentStep, steps: TUTORIAL_STEPS, completed, start, next, back, close, finish }
}

export function useTutorial() {
  const ctx = useContext(TutorialContext)
  if (!ctx) throw new Error('useTutorial must be used within TutorialProvider')
  return ctx
}
