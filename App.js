import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Alert, StyleSheet } from 'react-native';

import MenuForm from './components/MenuForm';
import MenuItemCard from './components/MenuItemCard';
import SearchFilterBar from './components/SearchFilterBar';
import StatsPanel from './components/StatsPanel';
import TabBar from './components/TabBar';
import { COLORS } from './constants';
import { filterMenuItems, calculateStats } from './utils/menuHelpers';

const TABS = [
  { key: 'menu', label: 'Menu' },
  { key: 'form', label: 'Add / Edit' },
  { key: 'stats', label: 'Statistics' },
];

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');
  const [editingItem, setEditingItem] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [message, setMessage] = useState('');

  // Shows a short success message at the top of the screen
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  };

  // Adds a new item, or saves changes if we are editing one
  const handleSaveItem = (itemData) => {
    if (editingItem) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...itemData } : item
        )
      );
      setEditingItem(null);
      showMessage('Menu item updated successfully!');
    } else {
      const newItem = { id: Date.now().toString(), ...itemData };
      setMenuItems((prev) => [...prev, newItem]);
      showMessage('Menu item added successfully!');
    }
    setActiveTab('menu');
  };

  const handleStartEdit = (item) => {
    setEditingItem(item);
    setActiveTab('form');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setActiveTab('menu');
  };

  // Asks the chef to confirm before removing an item
  const handleDelete = (item) => {
    Alert.alert('Delete menu item', `Delete "${item.dishName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setMenuItems((prev) => prev.filter((i) => i.id !== item.id));
          if (editingItem && editingItem.id === item.id) {
            setEditingItem(null);
          }
          showMessage('Menu item deleted.');
        },
      },
    ]);
  };

  const handleClearFilters = () => {
    setSearchText('');
    setCourseFilter('All');
  };

  const handleTabChange = (tab) => {
    // Leaving the form tab while editing cancels the edit
    if (tab !== 'form' && editingItem) {
      setEditingItem(null);
    }
    setActiveTab(tab);
  };

  const visibleItems = filterMenuItems(menuItems, searchText, courseFilter);
  const stats = calculateStats(menuItems);

  const renderMenuTab = () => (
    <View>
      <SearchFilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        courseFilter={courseFilter}
        onFilterChange={setCourseFilter}
        onClear={handleClearFilters}
      />

      <Text style={styles.listHeader}>
        Menu Items ({visibleItems.length}
        {visibleItems.length !== menuItems.length ? ` of ${menuItems.length}` : ''})
      </Text>

      {menuItems.length === 0 ? (
        <Text style={styles.emptyText}>
          No menu items yet. Go to the Add / Edit tab to create one.
        </Text>
      ) : visibleItems.length === 0 ? (
        <Text style={styles.emptyText}>No menu items match your search or filter.</Text>
      ) : (
        visibleItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Chef's Menu Manager</Text>
      </View>

      {message ? (
        <View style={styles.messageBanner}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === 'menu' && renderMenuTab()}
        {activeTab === 'form' && (
          <MenuForm
            editingItem={editingItem}
            onSubmit={handleSaveItem}
            onCancelEdit={handleCancelEdit}
          />
        )}
        {activeTab === 'stats' && <StatsPanel stats={stats} />}
      </ScrollView>

      <TabBar tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingVertical: 14,
    paddingTop: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  messageBanner: {
    backgroundColor: '#E3F4EA',
    paddingVertical: 10,
    alignItems: 'center',
  },
  messageText: { color: COLORS.success, fontWeight: '600' },
  content: { padding: 16, paddingBottom: 30 },
  listHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});
