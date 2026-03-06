import { type ReactNode } from 'react'
import { TutorialContext, useTutorialState } from '@/lib/tutorial'

export function TutorialProvider({ children }: { children: ReactNode }) {
  const value = useTutorialState()
  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  )
}
