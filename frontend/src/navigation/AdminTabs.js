import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import DashboardScreen from '../screens/admin/DashboardScreen';
import ClubsScreen from '../screens/admin/ClubsScreen';
import EventsScreen from '../screens/admin/EventsScreen';
import BudgetScreen from '../screens/admin/BudgetScreen';
import EventAttendanceScreen from '../screens/admin/EventAttendanceScreen';
import AnnouncementsScreen from '../screens/admin/AnnouncementsScreen';
import ProfileScreen from '../screens/admin/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AdminEventsStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.text,
    }}>
      <Stack.Screen name="AdminEventsList" component={EventsScreen} />
      <Stack.Screen name="EventAttendance" component={EventAttendanceScreen} />
    </Stack.Navigator>
  );
}

export default function AdminTabs() {
  const { theme, toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.inactive,
      headerStyle: { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border, borderBottomWidth: 1, elevation: 0, shadowOpacity: 0 },
      headerTintColor: theme.colors.text,
      headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      tabBarStyle: { borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface, elevation: 0, shadowOpacity: 0 },
      headerRight: () => (
        <TouchableOpacity 
          onPress={toggleTheme}
          style={{ marginRight: 16, padding: 8 }}
        >
          <MaterialCommunityIcons 
            name={isDarkMode ? 'weather-sunny' : 'weather-night'} 
            size={24} 
            color={theme.colors.textSecondary} 
          />
        </TouchableOpacity>
      ),
    }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="view-dashboard" color={color} size={size} /> }} />
      <Tab.Screen name="Clubs" component={ClubsScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-group" color={color} size={size} /> }} />
      <Tab.Screen name="Events" component={AdminEventsStack} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-edit" color={color} size={size} /> }} />
      <Tab.Screen name="Budget" component={BudgetScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="finance" color={color} size={size} /> }} />
      <Tab.Screen name="Alerts" component={AnnouncementsScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bullhorn" color={color} size={size} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}
