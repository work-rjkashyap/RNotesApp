// src/utils/theme/index.ts
import {Theme} from '../../types/theme';

// src/utils/theme/index.ts continued
export const lightTheme: Theme = {
  primary: '#007AFF',
  secondary: '#6B7280',
  background: '#FFFFFF',
  surface: '#F3F4F6',
  text: '#1F2937',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Component specific colors
  editorBackground: '#FFFFFF',
  toolbarBackground: '#F3F4F6',
  placeholderText: '#9CA3AF',
  borderColor: '#E5E7EB',
  dividerColor: '#E5E7EB',

  // Interaction states
  primaryHover: '#0062CC',
  primaryActive: '#004999',
  primaryDisabled: '#80BDFF',

  // Text variations
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Semantic variations
  errorLight: '#FEE2E2',
  errorDark: '#B91C1C',
  successLight: '#D1FAE5',
  successDark: '#059669',
  warningLight: '#FEF3C7',
  warningDark: '#D97706',
  infoLight: '#DBEAFE',
  infoDark: '#2563EB',
};

export const darkTheme: Theme = {
  primary: '#60A5FA',
  secondary: '#9CA3AF',
  background: '#1F2937',
  surface: '#374151',
  text: '#F3F4F6',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Component specific colors
  editorBackground: '#1F2937',
  toolbarBackground: '#374151',
  placeholderText: '#6B7280',
  borderColor: '#4B5563',
  dividerColor: '#4B5563',

  // Interaction states
  primaryHover: '#3B82F6',
  primaryActive: '#2563EB',
  primaryDisabled: '#93C5FD',

  // Text variations
  textSecondary: '#9CA3AF',
  textDisabled: '#6B7280',
  textInverse: '#1F2937',

  // Semantic variations
  errorLight: '#7F1D1D',
  errorDark: '#FCA5A5',
  successLight: '#064E3B',
  successDark: '#34D399',
  warningLight: '#78350F',
  warningDark: '#FCD34D',
  infoLight: '#1E3A8A',
  infoDark: '#93C5FD',
};

export const getThemeColor = (
  theme: Theme,
  variant: string,
  alpha: number = 1,
): string => {
  const color = theme[variant as keyof Theme];
  if (!color) return '';

  if (alpha === 1) return color;

  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getContrastText = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#1F2937' : '#FFFFFF';
};

export const createThemeVariant = (
  baseTheme: Theme,
  overrides: Partial<Theme>,
): Theme => {
  return {
    ...baseTheme,
    ...overrides,
  };
};

export const themeTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semibold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};
