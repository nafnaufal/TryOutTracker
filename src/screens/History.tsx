import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { getAllTryouts, deleteTryout } from '../utils/storage';
import { Tryout } from '../models/tryout';
import { styles } from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function History({ navigation }: Props) {
  const [list, setList] = useState<Tryout[]>([]);

  const load = useCallback(async () => {
    const l = await getAllTryouts();

    const sorted = [...l].sort(
      (a, b) =>
        (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0),
    );

    setList(sorted);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const highest = useMemo(() => {
    if (!list.length) return null;
    return Math.max(...list.map(t => Math.round(t.total_score / t.subtest_scores.length)));
  }, [list]);

  const handleDelete = (item: Tryout, index: number) => {
    Alert.alert(
      'Hapus Tryout',
      `Yakin ingin menghapus Tryout #${list.length - index}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            await deleteTryout(item.id);
            await load();
          },
        },
      ],
    );
  };

  const renderItem = ({ item, index }: { item: Tryout; index: number }) => {
    const previous = list[index + 1];
    const diff = previous ? Math.round(item.total_score / item.subtest_scores.length) - Math.round(previous.total_score / previous.subtest_scores.length) : null;

    return (
      <TouchableOpacity
        style={styles.historyCard}
        onPress={() => navigation.navigate('Result', { id: item.id })}
      >
        <View style={styles.historyAccent} />

        <View style={styles.historyContent}>
          <View>
            <Text style={styles.historyIndex}>Tryout #{list.length - index}</Text>

            <Text style={styles.historyDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.historyScore}>{Math.round(item.total_score / item.subtest_scores.length)}</Text>

            {diff !== null && (
              <Text
                style={[
                  styles.deltaText,
                  {
                    color:
                      diff > 0 ? '#22c55e' : diff < 0 ? '#ef4444' : '#94a3b8',
                  },
                ]}
              >
                {diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : '—'}
              </Text>
            )}

            <TouchableOpacity onPress={() => handleDelete(item, index)}>
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Riwayat Tryout</Text>

      {list.length > 0 && (
        <View style={styles.summaryBar}>
          <Text style={styles.summaryText}>Total Tryout: {list.length}</Text>
          <Text style={styles.summaryText}>Skor Tertinggi: {highest}</Text>
        </View>
      )}

      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={{ marginTop: 80, alignItems: 'center' }}>
            <Text style={styles.emptyTitle}>📊 Belum ada tryout</Text>
            <Text style={styles.emptySubtitle}>
              Tambahkan tryout pertama kamu.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
