import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#6366F1', // Indigo (Blue/Purple blend)
    primaryLight: '#E0E7FF',
    secondary: '#10B981', // Emerald for success/income
    secondaryLight: '#D1FAE5',
    accent: '#F59E0B', // Amber/Yellow for XP, Badges
    accentLight: '#FEF3C7',
    background: '#F3F4F6', // Light gray background
    surface: '#FFFFFF', // White cards
    text: '#111827', // Dark gray for high contrast
    textSecondary: '#6B7280', // Medium gray for descriptions
    error: '#EF4444', // Red for expenses/errors
    errorLight: '#FEE2E2',
    border: '#E5E7EB', // Subtle borders
    inactive: '#9CA3AF'
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40
  },
  borderRadius: {
    s: 8,
    m: 12,
    l: 20,
    round: 9999
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '800', color: '#111827' },
    h2: { fontSize: 24, fontWeight: '700', color: '#111827' },
    h3: { fontSize: 18, fontWeight: '600', color: '#111827' },
    body: { fontSize: 16, color: '#4B5563', lineHeight: 24 },
    caption: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
    small: { fontSize: 12, color: '#9CA3AF' },
  }
};
