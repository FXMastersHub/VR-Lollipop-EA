import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatItem = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  content: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#667eea',
    fontWeight: 'bold',
  },
});

export default StatItem;