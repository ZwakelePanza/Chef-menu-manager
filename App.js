import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// The three course options the chef can choose from
const COURSES = ['Starter', 'Main', 'Dessert'];

export default function App() {
  // Form field state
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  // List of menu items added so far
  const [menuItems, setMenuItems] = useState([]);

  // Validation error messages
  const [errors, setErrors] = useState({});

  // Temporary success confirmation message
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required.';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (!course) {
      newErrors.course = 'Please select a course.';
    }
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Enter a valid price greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddItem = () => {
    if (!validate()) {
      setSuccessMessage('');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    // Automatically update the displayed list
    setMenuItems((prevItems) => [...prevItems, newItem]);

    // Reset the form
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});

    setSuccessMessage('Menu item added successfully!');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>R{item.price}</Text>
      </View>
      <Text style={styles.courseTag}>{item.course}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Chef's Menu Manager</Text>
          <Text style={styles.subtitle}>Add and view your menu items</Text>

          {/* --- Add Menu Item Form --- */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Grilled Salmon"
              value={dishName}
              onChangeText={setDishName}
            />
            {errors.dishName ? (
              <Text style={styles.errorText}>{errors.dishName}</Text>
            ) : null}

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Short description of the dish"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}

            <Text style={styles.label}>Course</Text>
            <View style={styles.courseRow}>
              {COURSES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.courseButton,
                    course === c && styles.courseButtonSelected,
                  ]}
                  onPress={() => setCourse(c)}
                >
                  <Text
                    style={[
                      styles.courseButtonText,
                      course === c && styles.courseButtonTextSelected,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.course ? (
              <Text style={styles.errorText}>{errors.course}</Text>
            ) : null}

            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 149.99"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            {errors.price ? (
              <Text style={styles.errorText}>{errors.price}</Text>
            ) : null}

            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add Menu Item</Text>
            </TouchableOpacity>

            {successMessage ? (
              <Text style={styles.successText}>{successMessage}</Text>
            ) : null}
          </View>

          {/* --- Menu Items List --- */}
          <View style={styles.listSection}>
            <Text style={styles.listHeader}>
              Menu Items ({menuItems.length})
            </Text>

            {menuItems.length === 0 ? (
              <Text style={styles.emptyText}>
                No menu items have been added yet.
              </Text>
            ) : (
              <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2F2F2F',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3A',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FDFDFD',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#C0392B',
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    color: '#1E8449',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D8A657',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  courseButtonSelected: {
    backgroundColor: '#D8A657',
  },
  courseButtonText: {
    color: '#8A6B2E',
    fontWeight: '600',
    fontSize: 13,
  },
  courseButtonTextSelected: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#2F5D48',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  listSection: {
    marginTop: 4,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2F2F2F',
    marginBottom: 10,
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2F5D48',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F2F2F',
    flexShrink: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2F5D48',
  },
  courseTag: {
    fontSize: 12,
    color: '#8A6B2E',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#5A5A5A',
  },
});
