import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#4F46E5',
    primaryLight: '#E0E7FF',
    // Muted semantic colors to avoid bright/playful looks
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    
    // Light mode defaults
    background: '#F5F7FB',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    inactive: '#9CA3AF',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontSize: 15,
      lineHeight: 22,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  shadows: {
    small: Platform.select({
      web: { boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      },
    }),
    medium: Platform.select({
      web: { boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
      },
    }),
  },
};

export const getTheme = (isDark = false) => {
  if (isDark) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        background: '#0B0F1A',
        surface: '#121826',
        card: '#1A2233',
        border: '#2A3447',
        text: '#E5E7EB',
        textSecondary: '#9CA3AF',
        
        primaryLight: '#3730A3', // Darker shade for contrast
        inactive: '#4B5563',
      }
    };
  }
  return theme;
};
