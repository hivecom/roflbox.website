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
        className="font-mono text-xs bg-black/80 border border-white/30 text-white/80 hover:bg-black/90 hover:text-white focus-visible:ring-white/50 backdrop-blur-sm"
      >
        🎨 BG
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Background theme picker"
          className="bg-black/90 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-lg shadow-black/50"
          style={{ minWidth: '180px' }}
        >
          <div className="text-white/60 font-mono text-xs mb-2 font-bold tracking-wider">
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
                className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  currentThemeId === theme.id
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
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
                  <span className="ml-auto text-white/80" aria-label="(selected)">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 text-xs font-mono hover:text-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 w-full text-right"
            >
              [close]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
