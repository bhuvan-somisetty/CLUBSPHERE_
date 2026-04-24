import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Badge({ label, status = 'primary', style }) {
  const { theme } = useContext(ThemeContext);

  const getBackgroundColor = () => {
    switch (status) {
      case 'primary': return theme.colors.primaryLight;
      case 'secondary': return theme.colors.border;
      case 'error': return theme.colors.errorLight;
      case 'success': return theme.colors.successLight;
      case 'warning': return theme.colors.warningLight;
      default: return theme.colors.primaryLight;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.textSecondary;
      case 'error': return theme.colors.error;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.primary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor(), borderRadius: 6 }, style]}>
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
