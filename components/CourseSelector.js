import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Row of selectable course buttons. Used by the form and the filter bar.
// `options` lets the filter bar add an extra "All" option.
export default function CourseSelector({ options, selected, onSelect }) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: COLORS.accent },
  chipText: { color: COLORS.accentDark, fontWeight: '600', fontSize: 13 },
  chipTextSelected: { color: '#FFFFFF' },
});
