import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Reusable button. variant: 'primary' | 'secondary' | 'danger'
export default function AppButton({ title, onPress, variant = 'primary', style }) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: '#EFEAE0' },
  danger: { backgroundColor: COLORS.danger },
  text: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  secondaryText: { color: COLORS.text },
});
