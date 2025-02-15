import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const DIMENSIONS = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,

  WINDOW_WIDTH_SMALL: 320,
  WINDOW_WIDTH_MEDIUM: 375,
  WINDOW_WIDTH_LARGE: 414,
};

export const SPACING = {
  // Basic spacing units
  SCALE_2: 2,
  SCALE_4: 4,
  SCALE_8: 8,
  SCALE_12: 12,
  SCALE_16: 16,
  SCALE_20: 20,
  SCALE_24: 24,
  SCALE_32: 32,
  SCALE_40: 40,
  SCALE_48: 48,

  // Padding variations
  PADDING_MICRO: 4,
  PADDING_TINY: 8,
  PADDING_SMALL: 12,
  PADDING_MEDIUM: 16,
  PADDING_LARGE: 20,
  PADDING_XLARGE: 24,
  PADDING_XXL: 32,

  // Specific padding uses
  PADDING_PAGE: 16,
  PADDING_CARD: 12,
  PADDING_INPUT: 12,
  PADDING_BUTTON: 16,
  PADDING_LIST_ITEM: 16,
  PADDING_MODAL: 20,
  PADDING_HEADER: 16,
  PADDING_TAB: 12,

  // Margin variations
  MARGIN_MICRO: 4,
  MARGIN_TINY: 8,
  MARGIN_SMALL: 12,
  MARGIN_MEDIUM: 16,
  MARGIN_LARGE: 20,
  MARGIN_XLARGE: 24,
  MARGIN_XXL: 32,

  // Specific margin uses
  MARGIN_SECTION: 24,
  MARGIN_PARAGRAPH: 12,
  MARGIN_BUTTON: 8,
  MARGIN_INPUT: 12,
  MARGIN_LIST_ITEM: 8,

  // Gap spacing
  GAP_MICRO: 4,
  GAP_TINY: 8,
  GAP_SMALL: 12,
  GAP_MEDIUM: 16,
  GAP_LARGE: 20,
  GAP_XLARGE: 24,
};

// Light theme colors
export const COLORS_LIGHT = {
  // Brand colors
  PRIMARY: '#007AFF',
  PRIMARY_DARK: '#0056B3',
  PRIMARY_LIGHT: '#66B2FF',
  SECONDARY: '#5856D6',
  SECONDARY_DARK: '#3F3E99',
  SECONDARY_LIGHT: '#8583E1',

  // Semantic colors
  SUCCESS: '#34C759',
  SUCCESS_DARK: '#248A3D',
  SUCCESS_LIGHT: '#86E0A0',
  WARNING: '#FF9500',
  WARNING_DARK: '#C66A00',
  WARNING_LIGHT: '#FFB74D',
  ERROR: '#FF3B30',
  ERROR_DARK: '#CC2F26',
  ERROR_LIGHT: '#FF8279',
  INFO: '#5856D6',
  INFO_DARK: '#3F3E99',
  INFO_LIGHT: '#8583E1',

  // Grayscale
  WHITE: '#FFFFFF',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F2F2F7',
  GRAY_200: '#E5E5EA',
  GRAY_300: '#D1D1D6',
  GRAY_400: '#C7C7CC',
  GRAY_500: '#AEAEB2',
  GRAY_600: '#8E8E93',
  GRAY_700: '#636366',
  GRAY_800: '#3A3A3C',
  GRAY_900: '#1C1C1E',
  BLACK: '#000000',

  // Background colors
  BACKGROUND_PRIMARY: '#FFFFFF',
  BACKGROUND_SECONDARY: '#F2F2F7',
  BACKGROUND_TERTIARY: '#E5E5EA',

  // Surface colors
  SURFACE_1: '#FFFFFF',
  SURFACE_2: '#F2F2F7',
  SURFACE_3: '#E5E5EA',

  // Text colors
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#8E8E93',
  TEXT_TERTIARY: '#C7C7CC',
  TEXT_INVERSE: '#FFFFFF',

  // Border colors
  BORDER: '#E5E5EA',
  BORDER_LIGHT: '#F2F2F7',
  BORDER_DARK: '#D1D1D6',

  // Input colors
  INPUT_BACKGROUND: '#FFFFFF',
  INPUT_BORDER: '#E5E5EA',
  INPUT_TEXT: '#000000',
  INPUT_PLACEHOLDER: '#8E8E93',

  // Button colors
  BUTTON_PRIMARY: '#007AFF',
  BUTTON_SECONDARY: '#5856D6',
  BUTTON_SUCCESS: '#34C759',
  BUTTON_WARNING: '#FF9500',
  BUTTON_ERROR: '#FF3B30',
  BUTTON_DISABLED: '#C7C7CC',
};

// Dark theme colors
export const COLORS_DARK = {
  // Brand colors
  PRIMARY: '#0A84FF',
  PRIMARY_DARK: '#0056B3',
  PRIMARY_LIGHT: '#66B2FF',
  SECONDARY: '#5E5CE6',
  SECONDARY_DARK: '#3F3E99',
  SECONDARY_LIGHT: '#8583E1',

  // Semantic colors
  SUCCESS: '#32D74B',
  SUCCESS_DARK: '#248A3D',
  SUCCESS_LIGHT: '#86E0A0',
  WARNING: '#FF9F0A',
  WARNING_DARK: '#C66A00',
  WARNING_LIGHT: '#FFB74D',
  ERROR: '#FF453A',
  ERROR_DARK: '#CC2F26',
  ERROR_LIGHT: '#FF8279',
  INFO: '#5E5CE6',
  INFO_DARK: '#3F3E99',
  INFO_LIGHT: '#8583E1',

  // Grayscale
  WHITE: '#FFFFFF',
  GRAY_50: '#1C1C1E',
  GRAY_100: '#2C2C2E',
  GRAY_200: '#3A3A3C',
  GRAY_300: '#48484A',
  GRAY_400: '#636366',
  GRAY_500: '#8E8E93',
  GRAY_600: '#AEAEB2',
  GRAY_700: '#C7C7CC',
  GRAY_800: '#D1D1D6',
  GRAY_900: '#E5E5EA',
  BLACK: '#000000',

  // Background colors
  BACKGROUND_PRIMARY: '#000000',
  BACKGROUND_SECONDARY: '#1C1C1E',
  BACKGROUND_TERTIARY: '#2C2C2E',

  // Surface colors
  SURFACE_1: '#1C1C1E',
  SURFACE_2: '#2C2C2E',
  SURFACE_3: '#3A3A3C',

  // Text colors
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#AEAEB2',
  TEXT_TERTIARY: '#8E8E93',
  TEXT_INVERSE: '#000000',

  // Border colors
  BORDER: '#3A3A3C',
  BORDER_LIGHT: '#48484A',
  BORDER_DARK: '#2C2C2E',

  // Input colors
  INPUT_BACKGROUND: '#1C1C1E',
  INPUT_BORDER: '#3A3A3C',
  INPUT_TEXT: '#FFFFFF',
  INPUT_PLACEHOLDER: '#8E8E93',

  // Button colors
  BUTTON_PRIMARY: '#0A84FF',
  BUTTON_SECONDARY: '#5E5CE6',
  BUTTON_SUCCESS: '#32D74B',
  BUTTON_WARNING: '#FF9F0A',
  BUTTON_ERROR: '#FF453A',
  BUTTON_DISABLED: '#3A3A3C',
};

export const TYPOGRAPHY = {
  // Font families
  FONT_FAMILY: {
    REGULAR: 'System',
    MEDIUM: 'System',
    SEMIBOLD: 'System',
    BOLD: 'System',
    LIGHT: 'System',
  },

  // Font weights
  FONT_WEIGHT: {
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
  },

  // Font sizes
  FONT_SIZE: {
    MICRO: 10,
    TINY: 12,
    SMALL: 14,
    MEDIUM: 16,
    LARGE: 18,
    XLARGE: 20,
    XXL: 24,
    XXXL: 30,
    HUGE: 36,
    GIGANTIC: 48,
  },

  // Line heights
  LINE_HEIGHT: {
    MICRO: 12,
    TINY: 16,
    SMALL: 20,
    MEDIUM: 24,
    LARGE: 28,
    XLARGE: 32,
    XXL: 36,
    XXXL: 40,
    HUGE: 48,
    GIGANTIC: 56,
  },

  // Letter spacing
  LETTER_SPACING: {
    TIGHTER: -0.8,
    TIGHT: -0.4,
    NORMAL: 0,
    WIDE: 0.4,
    WIDER: 0.8,
  },

  // Presets for common text styles
  PRESET: {
    HEADER_1: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: '700',
      letterSpacing: -0.4,
    },
    HEADER_2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '700',
      letterSpacing: -0.4,
    },
    HEADER_3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
      letterSpacing: -0.4,
    },
    TITLE_1: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '600',
      letterSpacing: -0.4,
    },
    TITLE_2: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      letterSpacing: -0.4,
    },
    BODY_1: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
      letterSpacing: 0,
    },
    BODY_2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      letterSpacing: 0,
    },
    CAPTION_1: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
      letterSpacing: 0,
    },
    CAPTION_2: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '400',
      letterSpacing: 0,
    },
    BUTTON: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      letterSpacing: 0,
    },
    BUTTON_SMALL: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600',
      letterSpacing: 0,
    },
  },
};

export const BORDERS = {
  RADIUS: {
    NONE: 0,
    MICRO: 2,
    TINY: 4,
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
    XLARGE: 20,
    PILL: 999,
  },

  WIDTH: {
    NONE: 0,
    HAIRLINE: 0.5,
    THIN: 1,
    THICK: 2,
    HEAVY: 4,
  },

  STYLE: {
    SOLID: 'solid',
    DASHED: 'dashed',
    DOTTED: 'dotted',
  },
};

export const SHADOWS = {
  NONE: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  TINY: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  SMALL: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  MEDIUM: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  LARGE: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  XLARGE: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Z_INDEX = {
  BACKGROUND: -1,
  BASE: 0,
  FLOAT: 1,
  CARD: 10,
  INPUT: 20,
  HEADER: 30,
  MODAL: 40,
  OVERLAY: 50,
  TOOLTIP: 60,
  NOTIFICATION: 70,
};

export const LAYOUT = {
  FLEX: {
    FULL: {flex: 1},
    GROW: {flexGrow: 1},
    SHRINK: {flexShrink: 1},
    NONE: {flex: 0},
  },

  DIRECTION: {
    ROW: {flexDirection: 'row'},
    COLUMN: {flexDirection: 'column'},
    ROW_REVERSE: {flexDirection: 'row-reverse'},
    COLUMN_REVERSE: {flexDirection: 'column-reverse'},
  },

  ALIGN: {
    START: {alignItems: 'flex-start'},
    CENTER: {alignItems: 'center'},
    END: {alignItems: 'flex-end'},
    STRETCH: {alignItems: 'stretch'},
  },

  JUSTIFY: {
    START: {justifyContent: 'flex-start'},
    CENTER: {justifyContent: 'center'},
    END: {justifyContent: 'flex-end'},
    BETWEEN: {justifyContent: 'space-between'},
    AROUND: {justifyContent: 'space-around'},
    EVENLY: {justifyContent: 'space-evenly'},
  },

  WRAP: {
    NO_WRAP: {flexWrap: 'nowrap'},
    WRAP: {flexWrap: 'wrap'},
    WRAP_REVERSE: {flexWrap: 'wrap-reverse'},
  },

  // Common layout combinations
  CENTER_ALL: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SPREAD: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  STACK: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  ROW_CENTER: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export const ANIMATION = {
  DURATION: {
    INSTANT: 0,
    FAST: 150,
    NORMAL: 300,
    SLOW: 450,
    VERY_SLOW: 600,
  },

  EASING: {
    EASE_IN: 'easeIn',
    EASE_OUT: 'easeOut',
    EASE_IN_OUT: 'easeInOut',
    LINEAR: 'linear',
  },

  SCALE: {
    NONE: 1,
    SMALL: 0.95,
    MEDIUM: 0.9,
    LARGE: 0.85,
  },
};

export const HIT_SLOP = {
  NONE: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  SMALL: {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
  },
  MEDIUM: {
    top: 12,
    right: 12,
    bottom: 12,
    left: 12,
  },
  LARGE: {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
  },
};

// Common component styles
export const COMPONENTS = {
  BUTTON: {
    SIZES: {
      SMALL: {
        height: 32,
        paddingHorizontal: SPACING.PADDING_MEDIUM,
        borderRadius: BORDERS.RADIUS.SMALL,
        ...TYPOGRAPHY.PRESET.BUTTON_SMALL,
      },
      MEDIUM: {
        height: 44,
        paddingHorizontal: SPACING.PADDING_LARGE,
        borderRadius: BORDERS.RADIUS.MEDIUM,
        ...TYPOGRAPHY.PRESET.BUTTON,
      },
      LARGE: {
        height: 54,
        paddingHorizontal: SPACING.PADDING_XLARGE,
        borderRadius: BORDERS.RADIUS.LARGE,
        ...TYPOGRAPHY.PRESET.BUTTON,
      },
    },
  },

  INPUT: {
    SIZES: {
      SMALL: {
        height: 32,
        paddingHorizontal: SPACING.PADDING_SMALL,
        borderRadius: BORDERS.RADIUS.SMALL,
        fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
      },
      MEDIUM: {
        height: 44,
        paddingHorizontal: SPACING.PADDING_MEDIUM,
        borderRadius: BORDERS.RADIUS.MEDIUM,
        fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
      },
      LARGE: {
        height: 54,
        paddingHorizontal: SPACING.PADDING_LARGE,
        borderRadius: BORDERS.RADIUS.LARGE,
        fontSize: TYPOGRAPHY.FONT_SIZE.LARGE,
      },
    },
  },

  CARD: {
    SIZES: {
      SMALL: {
        padding: SPACING.PADDING_SMALL,
        borderRadius: BORDERS.RADIUS.SMALL,
        ...SHADOWS.SMALL,
      },
      MEDIUM: {
        padding: SPACING.PADDING_MEDIUM,
        borderRadius: BORDERS.RADIUS.MEDIUM,
        ...SHADOWS.MEDIUM,
      },
      LARGE: {
        padding: SPACING.PADDING_LARGE,
        borderRadius: BORDERS.RADIUS.LARGE,
        ...SHADOWS.LARGE,
      },
    },
    VARIANTS: {
      ELEVATED: {
        backgroundColor: COLORS_LIGHT.SURFACE_1,
        ...SHADOWS.MEDIUM,
        borderRadius: BORDERS.RADIUS.MEDIUM,
      },
      OUTLINED: {
        backgroundColor: COLORS_LIGHT.SURFACE_1,
        borderWidth: BORDERS.WIDTH.THIN,
        borderColor: COLORS_LIGHT.BORDER,
        borderRadius: BORDERS.RADIUS.MEDIUM,
      },
      FLAT: {
        backgroundColor: COLORS_LIGHT.SURFACE_2,
        borderRadius: BORDERS.RADIUS.MEDIUM,
      },
    },
    PRESETS: {
      PRIMARY: {
        padding: SPACING.PADDING_MEDIUM,
        backgroundColor: COLORS_LIGHT.SURFACE_1,
        borderRadius: BORDERS.RADIUS.MEDIUM,
        ...SHADOWS.MEDIUM,
      },
      SECONDARY: {
        padding: SPACING.PADDING_MEDIUM,
        backgroundColor: COLORS_LIGHT.SURFACE_2,
        borderRadius: BORDERS.RADIUS.MEDIUM,
        borderWidth: BORDERS.WIDTH.THIN,
        borderColor: COLORS_LIGHT.BORDER,
      },
      COMPACT: {
        padding: SPACING.PADDING_SMALL,
        backgroundColor: COLORS_LIGHT.SURFACE_1,
        borderRadius: BORDERS.RADIUS.SMALL,
        ...SHADOWS.SMALL,
      },
      SPACIOUS: {
        padding: SPACING.PADDING_LARGE,
        backgroundColor: COLORS_LIGHT.SURFACE_1,
        borderRadius: BORDERS.RADIUS.LARGE,
        ...SHADOWS.LARGE,
      },
    },
    CONTENT: {
      HEADER: {
        marginBottom: SPACING.MARGIN_SMALL,
      },
      TITLE: {
        ...TYPOGRAPHY.PRESET.TITLE_1,
        marginBottom: SPACING.MARGIN_TINY,
      },
      SUBTITLE: {
        ...TYPOGRAPHY.PRESET.BODY_2,
        color: COLORS_LIGHT.TEXT_SECONDARY,
        marginBottom: SPACING.MARGIN_SMALL,
      },
      BODY: {
        ...TYPOGRAPHY.PRESET.BODY_1,
        color: COLORS_LIGHT.TEXT_PRIMARY,
      },
      FOOTER: {
        marginTop: SPACING.MARGIN_MEDIUM,
        paddingTop: SPACING.PADDING_SMALL,
        borderTopWidth: BORDERS.WIDTH.THIN,
        borderTopColor: COLORS_LIGHT.BORDER,
      },
    },
    SPACING: {
      CONTENT_GAP: SPACING.GAP_MEDIUM,
      HEADER_FOOTER_PADDING: SPACING.PADDING_MEDIUM,
      HORIZONTAL_PADDING: SPACING.PADDING_MEDIUM,
      VERTICAL_PADDING: SPACING.PADDING_MEDIUM,
    },
    MEDIA: {
      ASPECT_RATIOS: {
        SQUARE: 1,
        LANDSCAPE: 16 / 9,
        PORTRAIT: 3 / 4,
      },
      VARIANTS: {
        FULL_BLEED: {
          margin: -SPACING.PADDING_MEDIUM,
          marginBottom: SPACING.MARGIN_MEDIUM,
        },
        ROUNDED: {
          borderRadius: BORDERS.RADIUS.MEDIUM,
          marginBottom: SPACING.MARGIN_MEDIUM,
        },
        CONTAINED: {
          borderRadius: BORDERS.RADIUS.MEDIUM,
          margin: SPACING.MARGIN_SMALL,
        },
      },
    },
    INTERACTIONS: {
      PRESSED: {
        opacity: 0.8,
        transform: [{scale: 0.98}],
      },
      HOVER: {
        ...SHADOWS.LARGE,
      },
      DISABLED: {
        opacity: 0.5,
      },
    },
  },
};

// Theme context helper
export const createTheme = (isDark = false) => ({
  colors: isDark ? COLORS_DARK : COLORS_LIGHT,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borders: BORDERS,
  shadows: SHADOWS,
  zIndex: Z_INDEX,
  layout: LAYOUT,
  animation: ANIMATION,
  hitSlop: HIT_SLOP,
  components: COMPONENTS,
});
