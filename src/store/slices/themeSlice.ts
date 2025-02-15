import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ACCENT_COLORS, FONTS} from '../../context/ThemeContext';

interface ThemeState {
  themeMode: 'light' | 'dark' | 'system';
  accentColor: string;
  fontFamily: string;
}

const initialState: ThemeState = {
  themeMode: 'system',
  accentColor: ACCENT_COLORS.blue,
  fontFamily: 'system',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (
      state,
      action: PayloadAction<'light' | 'dark' | 'system'>,
    ) => {
      state.themeMode = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.accentColor = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setThemePreferences: (
      state,
      action: PayloadAction<Partial<ThemeState>>,
    ) => {
      return {...state, ...action.payload};
    },
  },
});

export const {
  setThemeMode,
  setAccentColor,
  setFontFamily,
  setThemePreferences,
} = themeSlice.actions;
export default themeSlice.reducer;
