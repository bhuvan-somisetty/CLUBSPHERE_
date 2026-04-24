import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { formatCurrency } from '../../utils/currency';

export default function DashboardScreen() {
  const { user } = useContext(AuthContext);
  const { clubs, events, budgets } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  
  const styles = useMemo(() => getStyles(theme), [theme]);

  const totalIncome = budgets.filter(b => b.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = budgets.filter(b => b.type === 'expense').reduce((a, b) => a + b.amount, 0);

  const topClub = clubs.length > 0 ? clubs.reduce((prev, current) => (prev.memberCount > current.memberCount) ? prev : current) : null;
  const popularEvent = events.length > 0 ? events.find(e => e.joined) : null; // Simulating logic

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 64 }} showsVerticalScrollIndicator={false}>
      
      {/* Overview Block */}
      <LinearGradient colors={[theme.colors.primary, '#3730A3']} style={styles.gradientHeader}>
         <Text style={[theme.typography.caption, { color: 'rgba(255,255,255,0.8)' }]}>Admin Control Center</Text>
         <Text style={[theme.typography.h1, { color: '#FFFFFF', marginTop: 4 }]}>Welcome, {user?.name}</Text>
      </LinearGradient>

      <View style={{ padding: 16, gap: 20 }}>
        {/* Stats Grid */}
        <View style={styles.grid}>
          <Card style={styles.gridItem}>
             <View style={styles.iconCircle}>
               <MaterialCommunityIcons name="google-circles-extended" size={24} color={theme.colors.primary} />
             </View>
             <Text style={[theme.typography.h2, { marginTop: 12 }]}>{clubs.length}</Text>
             <Text style={theme.typography.small}>Total Clubs</Text>
          </Card>
          <Card style={styles.gridItem}>
             <View style={[styles.iconCircle, { backgroundColor: theme.colors.successLight }]}>
               <MaterialCommunityIcons name="calendar-star" size={24} color={theme.colors.success} />
             </View>
             <Text style={[theme.typography.h2, { marginTop: 12 }]}>{events.length}</Text>
             <Text style={theme.typography.small}>Total Events</Text>
          </Card>
        </View>

        {/* Finance Summary */}
        <Card>
          <Text style={[theme.typography.h3, { marginBottom: 16 }]}>Financial Summary</Text>
          
          <View style={styles.financeRow}>
            <Text style={theme.typography.body}>Income</Text>
            <Text style={[theme.typography.h3, { color: theme.colors.success }]}>+{formatCurrency(totalIncome)}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.financeRow}>
            <Text style={theme.typography.body}>Expenses</Text>
            <Text style={[theme.typography.h3, { color: theme.colors.error }]}>-{formatCurrency(totalExpense)}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.financeRow}>
            <Text style={theme.typography.h3}>Net Balance</Text>
            <Text style={[theme.typography.h2, { color: (totalIncome - totalExpense) >= 0 ? theme.colors.text : theme.colors.error }]}>
              {formatCurrency(totalIncome - totalExpense)}
            </Text>
          </View>
        </Card>

        {/* Insights Block */}
        <View>
          <Text style={[theme.typography.h3, { marginBottom: 12 }]}>Intelligence System</Text>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <MaterialCommunityIcons name="trending-up" size={24} color={theme.colors.success} />
              <View style={{ flex: 1 }}>
                 <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>Most Active Club</Text>
                 <Text style={theme.typography.h3}>{topClub?.name || 'N/A'}</Text>
              </View>
              <Badge label={`${topClub?.memberCount || 0} Mem`} status="primary" />
            </View>
            
            <View style={styles.divider} />

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 16 }}>
              <MaterialCommunityIcons name="star-shooting" size={24} color={theme.colors.warning} />
              <View style={{ flex: 1 }}>
                 <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>Highest Rating Event</Text>
                 <Text style={theme.typography.h3}>{popularEvent?.title || 'No Events Booked'}</Text>
              </View>
            </View>
          </Card>
        </View>
      
      </View>
    </ScrollView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  gradientHeader: { 
    padding: 24, 
    paddingTop: 48, 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    ...theme.shadows.medium 
  },
  grid: { flexDirection: 'row', gap: 16 },
  gridItem: { flex: 1, alignItems: 'center', margin: 0 },
  iconCircle: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: theme.colors.primaryLight, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  financeRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 4 
  },
  divider: { 
    height: 1, 
    backgroundColor: theme.colors.border, 
    marginVertical: 12 
  }
});
