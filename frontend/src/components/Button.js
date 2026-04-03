import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { theme } from '../utils/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false, 
  icon = null,
  style, 
  textStyle 
}) {
  const getColors = () => {
    if (disabled) return { bg: theme.colors.border, text: theme.colors.textSecondary };
    switch (variant) {
      case 'secondary': return { bg: theme.colors.secondary, text: theme.colors.surface };
      case 'outline': return { bg: 'transparent', text: theme.colors.primary, border: theme.colors.primary };
      case 'danger': return { bg: theme.colors.errorLight, text: theme.colors.error };
      case 'ghost': return { bg: theme.colors.primaryLight, text: theme.colors.primary };
      default: return { bg: theme.colors.primary, text: theme.colors.surface };
    }
  };

  const colors = getColors();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.bg },
        variant === 'outline' && { borderWidth: 1, borderColor: colors.border },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <View style={styles.content}>
          {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.text} style={styles.icon} />}
          <Text style={[styles.text, { color: colors.text }, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  }
});
