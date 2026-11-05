import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import CourseSelector from './CourseSelector';
import AppButton from './AppButton';
import { COURSES, COLORS } from '../constants';

// Search box + course filter + clear button.
export default function SearchFilterBar({
  searchText,
  onSearchChange,
  courseFilter,
  onFilterChange,
  onClear,
}) {
  const isActive = searchText.trim() !== '' || courseFilter !== 'All';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by dish name..."
        value={searchText}
        onChangeText={onSearchChange}
      />

      <Text style={styles.label}>Filter by course</Text>
      <CourseSelector
        options={['All', ...COURSES]}
        selected={courseFilter}
        onSelect={onFilterChange}
      />

      {isActive ? (
        <AppButton
          title="Clear search & filter"
          variant="secondary"
          onPress={onClear}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FDFDFD',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
});
