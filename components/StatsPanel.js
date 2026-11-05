import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COURSES, COLORS } from '../constants';
import { formatPrice } from '../utils/menuHelpers';

function StatTile({ label, value }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

// Shows the menu overview numbers.
export default function StatsPanel({ stats }) {
  return (
    <View>
      <View style={styles.row}>
        <StatTile label="Total items" value={stats.total} />
        <StatTile label="Average price" value={formatPrice(stats.averagePrice)} />
      </View>

      <Text style={styles.heading}>Items per course</Text>
      <View style={styles.row}>
        {COURSES.map((course) => (
          <StatTile
            key={course}
            label={course}
            value={stats.countByCourse[course]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 16 },
  tile: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tileValue: { fontSize: 22, fontWeight: '700', color: COLORS.primary },
  tileLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    marginLeft: 4,
  },
});
