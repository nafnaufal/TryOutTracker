import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import type { Route } from '../../App';
import { getAllTryouts } from '../utils/storage';
import { Tryout } from '../models/tryout';

export default function History({ navigate }: { navigate: (r: Route) => void }) {
  const [list, setList] = useState<Tryout[]>([]);

  useEffect(() => {
    (async () => {
      const l = await getAllTryouts();
      setList(l);
    })();
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Riwayat Tryout</Text>
      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigate({ name: 'Result', params: { id: item.id } })}>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.total}>{item.total_score}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Tidak ada tryout</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  total: { fontWeight: '700' },
});
