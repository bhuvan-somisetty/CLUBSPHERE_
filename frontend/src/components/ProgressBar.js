import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../utils/theme';

export default function ProgressBar({ current, max, label = true }) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
         <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      {label && (
         <View style={styles.labelRow}>
            <Text style={theme.typography.small}>XP Points (Level Progression)</Text>
            <Text style={[theme.typography.small, { fontWeight: '700', color: theme.colors.primary }]}>{current} / {max}</Text>
         </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: theme.spacing.s },
  barBackground: { height: 10, backgroundColor: theme.colors.border, borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: theme.colors.accent, borderRadius: 5 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }
});
