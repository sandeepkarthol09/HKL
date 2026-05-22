import { useColorScheme } from 'react-native';
import { COLORS } from './colors';

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    isDark,
    background: isDark ? '#000000' : COLORS.background,
    textPrimary: isDark ? '#FFFFFF' : COLORS.textPrimary,
    textMuted: isDark ? '#7E7E86' : COLORS.textMuted,
    logoBg: isDark ? '#060640ff' : '#060640ff',
    logoBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(99, 102, 241, 0.2)',
    inputBg: isDark ? '#1C1C1E' : '#FFFFFF',
    inputBorder: isDark ? 'transparent' : 'rgba(16, 14, 14, 0.08)',
    inputBorderFocused: isDark ? '#7E7E86' : COLORS.primary,
    inputText: isDark ? '#FFFFFF' : COLORS.textPrimary,
    inputPlaceholder: isDark ? '#7E7E86' : '#94A3B8',
    btnBg: isDark ? '#7E7E86' : COLORS.primary,
    btnText: isDark ? '#1C1C1E' : '#FFFFFF',
    linkText: isDark ? COLORS.primaryLight : COLORS.primary,
    statusBar: isDark ? 'light-content' : 'dark-content',
    statusBarBg: isDark ? '#000000' : COLORS.background,
  };

  return theme;
};
