import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import AuthContainer from '../../components/AuthContainer';
import Button from '../../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthLandingScreen({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AuthContainer>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <MaterialCommunityIcons 
            name={isDarkMode ? 'weather-sunny' : 'weather-night'} 
            size={24} 
            color={theme.colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
          <MaterialCommunityIcons name="google-circles-extended" size={32} color={theme.colors.primary} />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>ClubSphere</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Your campus community, all in one place.
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <Button 
          title="Student Login" 
          onPress={() => navigation.navigate('StudentLogin')} 
          icon="account-school"
          style={styles.mainButton}
        />
        <Button 
          title="Admin Login" 
          variant="secondary"
          onPress={() => navigation.navigate('AdminLogin')} 
          icon="shield-account"
          style={styles.mainButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          New to ClubSphere?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('StudentSignup')}>
          <Text style={[styles.linkText, { color: theme.colors.primary }]}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  themeToggle: {
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    marginBottom: 32,
  },
  mainButton: {
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
  }
});
