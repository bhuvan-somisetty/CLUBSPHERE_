import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

export default function Card({ children, style, onPress, noPadding = false }) {
  const CardContainer = onPress ? TouchableOpacity : View;
  
  return (
    <CardContainer 
      onPress={onPress} 
      activeOpacity={0.8}
      style={[
        styles.card, 
        theme.shadows.medium,
        !noPadding && styles.padding,
        style
      ]}
    >
      {children}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.m,
  },
  padding: {
    padding: theme.spacing.m,
  }
});
