import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import type { Route } from '../../App';
import { computeTotal } from '../models/tryout';
import { saveTryout } from '../utils/storage';
// simple id generator to avoid extra dependency
function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const DEFAULT_SUBTESTS = ['TPS', 'Literasi', 'Penalaran'];

export default function AddTryout({ navigate }: { navigate: (r: Route) => void }) {
  const [scores, setScores] = useState<number[]>([0, 0, 0]);

  const setAt = (i: number, v: string) => {
    const copy = scores.slice();
    copy[i] = Number(v) || 0;
    setScores(copy);
  };

  const onSave = async () => {
    const subtest_scores = DEFAULT_SUBTESTS.map((name, i) => ({ name, score: scores[i] }));
    const total = computeTotal(subtest_scores as any);
    const t = { id: makeId(), date: new Date().toISOString(), subtest_scores, total_score: total } as any;
    try {
      await saveTryout(t);
      navigate({ name: 'Result', params: { id: t.id } });
    } catch (e) {
      Alert.alert('Gagal menyimpan', String(e));
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Tambah Tryout</Text>
      {DEFAULT_SUBTESTS.map((s, i) => (
        <View key={s} style={styles.row}>
          <Text style={{ width: 120 }}>{s}</Text>
          <TextInput
            keyboardType="numeric"
            value={String(scores[i])}
            onChangeText={(t) => setAt(i, t)}
            style={styles.input}
          />
        </View>
      ))}
      <View style={{ marginTop: 20 }}>
        <Button title="Simpan" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, flex: 1, borderRadius: 6 },
});
