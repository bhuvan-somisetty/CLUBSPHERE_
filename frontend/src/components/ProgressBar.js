import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ProgressBar({ current = 0, max = 100, label = 'XP', color, inverted = false }) {
  const { theme } = useContext(ThemeContext);
  const percentage = max > 0 ? (current / max) * 100 : 0;
  
  const textColor = inverted ? '#FFFFFF' : theme.colors.text;
  const secondaryTextColor = inverted ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary;
  const trackColor = inverted ? 'rgba(255,255,255,0.2)' : theme.colors.border;
  const fillColor = color || theme.colors.primary;

  return (
    <View style={[styles.container, { marginTop: 16 }]}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        <Text style={[styles.text, { color: secondaryTextColor }]}>
          {current}/{max}
        </Text>
      </View>
      <View style={[styles.barContainer, { backgroundColor: trackColor }]}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
      <Text style={[styles.percentage, { color: secondaryTextColor }]}>{Math.round(percentage)}% Complete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  text: {
    fontSize: 12,
  },
  barContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentage: {
    fontSize: 12,
    textAlign: 'right',
  },
});
