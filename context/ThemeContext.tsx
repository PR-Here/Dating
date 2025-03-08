import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, lightTheme, darkTheme } from '../constants/Colors';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  accent: string;
}

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  colors: lightTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');

  const getActiveColors = () => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return theme === 'dark' ? darkTheme : lightTheme;
  };

  const [colors, setColors] = useState(getActiveColors());

  useEffect(() => {
    setColors(getActiveColors());
  }, [theme, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 