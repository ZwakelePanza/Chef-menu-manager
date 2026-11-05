import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Simple bottom navigation bar. `tabs` is a list of { key, label }.
export default function TabBar({ tabs, activeTab, onChange }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive ? <View style={styles.indicator} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  label: { fontSize: 14, color: COLORS.muted, fontWeight: '600' },
  labelActive: { color: COLORS.primary },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    width: '50%',
    backgroundColor: COLORS.primary,
  },
});
