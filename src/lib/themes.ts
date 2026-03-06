/** Single source of truth for background/color theme presets. */

export interface BgTheme {
  id: string;
  /** User-facing display name */
  label: string;
  type: 'gradient' | 'solid';
  /** CSS background value applied to the page */
  value: string;
  /** Hint for whether content on this background reads better on light or dark text */
  textMode: 'light' | 'dark';
  /** Swatch color shown in the picker (a representative single color) */
  swatch: string;
}

/** Curated list of background presets. */
export const BG_THEMES: BgTheme[] = [
  {
    // Classic ROFL – the original chaotic vibe, slightly muted
    id: 'classic-rofl',
    label: 'Classic ROFL',
    type: 'gradient',
    value: 'linear-gradient(135deg, #8b00ff 0%, #2d8a00 33%, #cc6600 66%, #cc0066 100%)',
    textMode: 'dark',
    swatch: '#8b00ff',
  },
  {
    // Calm cool gradient – easy on the eyes, blue-ish
    id: 'cool-blue',
    label: 'Cool Blue',
    type: 'gradient',
    value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    textMode: 'dark',
    swatch: '#2c5364',
  },
  {
    // Near-black solid – dark mode-ish, comfortable
    id: 'deep-space',
    label: 'Deep Space',
    type: 'solid',
    value: '#0a0a0f',
    textMode: 'dark',
    swatch: '#0a0a0f',
  },
  {
    // Near-white solid – comfortable reading for light-mode preference
    id: 'paper-white',
    label: 'Paper White',
    type: 'solid',
    value: '#f5f5f0',
    textMode: 'light',
    swatch: '#f5f5f0',
  },
  {
    // Muted playful gradient – low saturation, keeps the fun
    id: 'muted-sunset',
    label: 'Muted Sunset',
    type: 'gradient',
    value: 'linear-gradient(135deg, #6b4c7e 0%, #7e4c4c 50%, #7e6b4c 100%)',
    textMode: 'dark',
    swatch: '#7e4c4c',
  },
  {
    // Dark navy gradient – cinematic, readable
    id: 'midnight-navy',
    label: 'Midnight Navy',
    type: 'gradient',
    value: 'linear-gradient(135deg, #000000 0%, #0d1b2a 50%, #1b2838 100%)',
    textMode: 'dark',
    swatch: '#0d1b2a',
  },
  {
    // Hacker Green – classic terminal aesthetic, neon green accents
    id: 'hacker-green',
    label: 'Hacker Green',
    type: 'gradient',
    value: 'linear-gradient(135deg, #050f05 0%, #0a1a0a 60%, #0d2010 100%)',
    textMode: 'dark',
    swatch: '#0a1a0a',
  },
];

export const DEFAULT_THEME_ID = 'classic-rofl';
