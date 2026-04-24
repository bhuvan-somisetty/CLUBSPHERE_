import React, { useContext, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) {
  const { theme } = useContext(ThemeContext);
  const isDisabled = disabled || loading;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const getBackgroundColor = () => {
    if (variant === 'ghost' || variant === 'outline') return 'transparent';
    if (isDisabled) return theme.colors.inactive;
    
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'danger': return theme.colors.error;
      case 'secondary': return theme.colors.border;
      default: return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (variant === 'ghost' || variant === 'outline') {
      return isDisabled ? theme.colors.inactive : (variant === 'danger' ? theme.colors.error : theme.colors.primary);
    }
    return variant === 'secondary' ? theme.colors.text : '#FFFFFF';
  };

  const getBorderColor = () => {
    if (variant === 'outline') {
      return isDisabled ? theme.colors.inactive : theme.colors.border;
    }
    return 'transparent';
  };

  const getPadding = () => {
    switch (size) {
      case 'sm': return { height: 36, paddingHorizontal: 12 };
      case 'md': return { height: 44, paddingHorizontal: 16 };
      case 'lg': return { height: 48, paddingHorizontal: 20 };
      default: return { height: 44, paddingHorizontal: 16 };
    }
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'outline' ? 1 : 0,
            ...getPadding(),
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={18}
                color={getTextColor()}
                style={{ marginRight: 6 }}
              />
            )}
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});
