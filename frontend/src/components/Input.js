import React, { useContext, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  leftIcon,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style
}) {
  const { theme } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.inputWrapper,
        { 
          backgroundColor: theme.colors.surface,
          borderColor: error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border,
          borderWidth: 1,
          borderRadius: 10
        }
      ]}>
        {leftIcon && (
          <MaterialCommunityIcons 
            name={leftIcon} 
            size={18} 
            color={isFocused ? theme.colors.primary : theme.colors.inactive} 
            style={styles.leftIcon} 
          />
        )}
        <TextInput
          style={[
            styles.input, 
            { color: theme.colors.text }
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.inactive}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIcon}>
            <MaterialCommunityIcons 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={18} 
              color={theme.colors.inactive} 
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});
