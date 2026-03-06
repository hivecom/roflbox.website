import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BG_THEMES, type BgTheme } from '@/lib/themes'

interface BackgroundSwitcherProps {
  currentThemeId: string
  onThemeChange: (theme: BgTheme) => void
}

export function BackgroundSwitcher({ currentThemeId, onThemeChange }: BackgroundSwitcherProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-3 right-3 z-50 flex flex-col items-end gap-2">
      <Button
        size="sm"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Open theme picker"
        aria-expanded={open}
        title="Change background theme"
        className="font-mono text-xs bg-black/70 border border-green-400 text-green-400 hover:bg-green-900/50 hover:text-green-300 focus-visible:ring-green-400 backdrop-blur-sm"
      >
        🎨 BG
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Background theme picker"
          className="bg-black/90 border border-green-400 rounded-lg p-3 backdrop-blur-sm shadow-lg shadow-black/50"
          style={{ minWidth: '180px' }}
        >
          <div className="text-green-400 font-mono text-xs mb-2 font-bold tracking-wider">
            SELECT THEME:
          </div>
          <div className="flex flex-col gap-1.5">
            {BG_THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme)
                  setOpen(false)
                }}
                className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${
                  currentThemeId === theme.id
                    ? 'bg-green-900/60 text-green-300 border border-green-500'
                    : 'text-green-400/80 hover:bg-green-900/30 hover:text-green-300 border border-transparent'
                }`}
              >
                {/* Swatch */}
                <span
                  className="inline-block w-4 h-4 rounded-sm border border-white/20 flex-shrink-0"
                  style={{ background: theme.swatch }}
                  aria-hidden="true"
                />
                <span>{theme.label}</span>
                {currentThemeId === theme.id && (
                  <span className="ml-auto text-green-400" aria-label="(selected)">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-green-900">
            <button
              onClick={() => setOpen(false)}
              className="text-green-400/50 text-xs font-mono hover:text-green-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-400 w-full text-right"
            >
              [close]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
