import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { Route } from '../../App';
import { getTryoutById, getAllTryouts } from '../utils/storage';
import { Tryout } from '../models/tryout';

export default function Result({ navigate, id }: { navigate: (r: Route) => void; id: string }) {
  const [t, setT] = useState<Tryout | null>(null);
  const [prev, setPrev] = useState<Tryout | null>(null);

  useEffect(() => {
    (async () => {
      const cur = await getTryoutById(id);
      setT(cur);
      const all = await getAllTryouts();
      const other = all.find((x) => x.id !== id) ?? null;
      setPrev(other);
    })();
  }, [id]);

  const trendSummary = () => {
    if (!t || !prev) return 'Tidak ada perbandingan sebelumnya';
    const diff = t.total_score - prev.total_score;
    const sign = diff > 0 ? '+' : '';
    return `Kamu ${diff === 0 ? 'tidak berubah' : `meningkat ${sign}${diff} poin`}`;
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Hasil Tryout</Text>
      {t ? (
        <View>
          <Text>{new Date(t.date).toLocaleString()}</Text>
          <Text style={styles.total}>Total: {t.total_score}</Text>
          <Text style={{ marginTop: 12 }}>{trendSummary()}</Text>
          <View style={{ marginTop: 20 }}>
            <Button title="Selesai" onPress={() => navigate({ name: 'Home' })} />
          </View>
        </View>
      ) : (
        <Text>Memuat hasil...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: '700' }, total: { fontSize: 22, fontWeight: '800' } });
