import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { Route } from '../../App';
import { getAllTryouts } from '../utils/storage';
import { Tryout } from '../models/tryout';

export default function Home({ navigate }: { navigate: (r: Route) => void }) {
  const [last, setLast] = useState<Tryout | null>(null);

  useEffect(() => {
    (async () => {
      const list = await getAllTryouts();
      setLast(list[0] ?? null);
    })();
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.header}>Terakhir</Text>
      {last ? (
        <View style={styles.card}>
          <Text>{new Date(last.date).toLocaleString()}</Text>
          <Text style={styles.total}>Total: {last.total_score}</Text>
        </View>
      ) : (
        <Text>Tidak ada data. Tambah tryout pertama Anda.</Text>
      )}

      <View style={styles.actions}>
        <Button title="Tambah Tryout" onPress={() => navigate({ name: 'AddTryout' })} />
        <Button title="Riwayat" onPress={() => navigate({ name: 'History' })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  card: { padding: 12, borderRadius: 8, backgroundColor: '#fafafa', marginBottom: 12 },
  total: { marginTop: 8, fontSize: 20, fontWeight: '700' },
  actions: { marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' },
});
