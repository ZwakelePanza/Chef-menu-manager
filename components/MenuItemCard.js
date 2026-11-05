import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { COLORS } from '../constants';
import { formatPrice } from '../utils/menuHelpers';

// Displays one menu item with Edit and Delete buttons.
export default function MenuItemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.buttonRow}>
        <AppButton
          title="Edit"
          variant="secondary"
          onPress={() => onEdit(item)}
          style={styles.smallButton}
        />
        <AppButton
          title="Delete"
          variant="danger"
          onPress={() => onDelete(item)}
          style={styles.smallButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    flexShrink: 1,
    marginRight: 8,
  },
  price: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
  course: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accentDark,
    marginTop: 4,
    marginBottom: 4,
  },
  description: { fontSize: 13, color: '#5A5A5A' },
  buttonRow: { flexDirection: 'row', marginTop: 12 },
  smallButton: { flex: 1, marginRight: 8, paddingVertical: 9 },
});
