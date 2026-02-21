import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <View style={styles.root}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.back}>
          <Text>{'<'} Kembali</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.back} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 18, fontWeight: '600' },
  back: { width: 80 },
});
