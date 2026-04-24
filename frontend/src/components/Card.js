import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Card({ children, style }) {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: theme.colors.card,
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderColor: isDarkMode ? theme.colors.border : 'transparent',
        borderWidth: isDarkMode ? 1 : 0,
        ...(isDarkMode ? {} : theme.shadows.small),
      },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});
