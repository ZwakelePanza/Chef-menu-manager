import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import CourseSelector from './CourseSelector';
import { COURSES, COLORS } from '../constants';
import { validateMenuItem } from '../utils/validation';

const EMPTY_FORM = { dishName: '', description: '', course: '', price: '' };

// Form used for BOTH adding a new item and editing an existing one.
// If `editingItem` is given, the form is filled with its values.
export default function MenuForm({ editingItem, onSubmit, onCancelEdit }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = editingItem !== null;

  // Fill the form when an item is chosen for editing, clear it otherwise.
  useEffect(() => {
    if (editingItem) {
      setValues({
        dishName: editingItem.dishName,
        description: editingItem.description,
        course: editingItem.course,
        price: String(editingItem.price),
      });
    } else {
      setValues(EMPTY_FORM);
    }
    setErrors({});
  }, [editingItem]);

  const updateField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Remove the error for this field as soon as the user fixes it
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const foundErrors = validateMenuItem(values);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    onSubmit({
      dishName: values.dishName.trim(),
      description: values.description.trim(),
      course: values.course,
      price: Number(values.price).toFixed(2),
    });
    setValues(EMPTY_FORM);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
      </Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Grilled Salmon"
        value={values.dishName}
        onChangeText={(text) => updateField('dishName', text)}
      />
      {errors.dishName ? <Text style={styles.error}>{errors.dishName}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Short description of the dish"
        value={values.description}
        onChangeText={(text) => updateField('description', text)}
        multiline
      />
      {errors.description ? (
        <Text style={styles.error}>{errors.description}</Text>
      ) : null}

      <Text style={styles.label}>Course</Text>
      <CourseSelector
        options={COURSES}
        selected={values.course}
        onSelect={(course) => updateField('course', course)}
      />
      {errors.course ? <Text style={styles.error}>{errors.course}</Text> : null}

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 149.99"
        value={values.price}
        onChangeText={(text) => updateField('price', text)}
        keyboardType="decimal-pad"
      />
      {errors.price ? <Text style={styles.error}>{errors.price}</Text> : null}

      <AppButton
        title={isEditing ? 'Save Changes' : 'Add Menu Item'}
        onPress={handleSubmit}
        style={styles.submit}
      />

      {isEditing ? (
        <AppButton
          title="Cancel Editing"
          variant="secondary"
          onPress={onCancelEdit}
          style={styles.cancel}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
  },
  heading: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 6,
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
  textArea: { minHeight: 70, textAlignVertical: 'top' },
  error: { color: COLORS.error, fontSize: 12, marginTop: 4 },
  submit: { marginTop: 18 },
  cancel: { marginTop: 10 },
});
