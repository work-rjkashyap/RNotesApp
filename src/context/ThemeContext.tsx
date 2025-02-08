import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useColorScheme} from 'react-native';
import {Theme} from '../types/theme';

const THEME_STORAGE_KEY = '@app_theme_mode';

const lightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#2c3e50',
  secondary: '#34495e',
  accent: '#3498db',
  error: '#e74c3c',
  surface: '#ecf0f1',
  card: '#f8f9fa',
  cardAccent: '#f5f5f5',
  border: '#dcdcdc',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#ffffff',
  primary: '#3498db',
  secondary: '#2c3e50',
  accent: '#e74c3c',
  error: '#c0392b',
  surface: '#1e1e1e',
  card: '#1a1a1a',
  cardAccent: '#2a2a2a',
  border: '#333333',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
  setThemeMode: () => {},
  themeMode: 'system',
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<'light' | 'dark' | 'system'>(
    'system',
  );

  const isDark =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
      : themeMode === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeModeState(savedTheme as 'light' | 'dark' | 'system');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };
    loadSavedTheme();
  }, []);

  const setThemeMode = async (mode: 'light' | 'dark' | 'system') => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  return (
    <ThemeContext.Provider
      value={{theme, isDark, toggleTheme, setThemeMode, themeMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
