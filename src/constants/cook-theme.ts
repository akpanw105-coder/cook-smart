export const CookTheme = {
  colors: {
    background: '#0D0E12',
    surface: '#17191E',
    surfaceElevated: '#22252C',
    surfaceBorder: '#2B2F38',
    surfaceActive: '#323742',
    
    primary: '#FF6417',
    primaryPressed: '#E0530E',
    primaryLight: 'rgba(255, 100, 23, 0.15)',
    primaryBorder: 'rgba(255, 100, 23, 0.35)',
    
    text: '#FFFFFF',
    textSecondary: '#9EA4B0',
    textMuted: '#686F7C',
    
    tagDifficulty: {
      Easy: '#10B981',
      Medium: '#F59E0B',
      Hard: '#EF4444',
    },
    
    danger: '#EF4444',
    dangerLight: 'rgba(239, 68, 68, 0.15)',
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    xxl: 36,
  },
} as const;
