import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { getTryoutById, getAllTryouts } from '../utils/storage';
import { Tryout } from '../models/tryout';
import {
  totalTrend as calcTotalTrend,
  perSubtestDeltas,
} from '../utils/trends';
import { styles } from '../styles/globalStyles';
import SubtestCard from '../components/SubtestCard';
import SummaryCard from '../components/SummaryCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function Result({ navigation, route }: Props) {
  const { id } = route.params;

  const [current, setCurrent] = useState<Tryout | null>(null);
  const [previous, setPrevious] = useState<Tryout | null>(null);

  useEffect(() => {
    (async () => {
      const cur = await getTryoutById(id);
      setCurrent(cur);

      const all = await getAllTryouts();
      const sorted = all.slice().reverse();
      const index = sorted.findIndex(x => x.id === id);
      const prev = index > 0 ? sorted[index - 1] : null;
      setPrevious(prev);
    })();
  }, [id]);

  const totalTrend = useMemo(
    () => calcTotalTrend(current, previous),
    [current, previous],
  );

  const deltas = useMemo(
    () => perSubtestDeltas(current, previous),
    [current, previous],
  );

  if (!current) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.bodyText}>Memuat hasil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.title}>Hasil Tryout</Text>

        {/* SUMMARY */}
        <SummaryCard
          totalScore={current.total_score}
          trend={previous ? totalTrend : undefined}
          subtitle={new Date(current.date).toLocaleString()}
        />
        {/* DETAIL PER SUBTES */}
        <Text style={styles.sectionTitle}>Detail Per Subtes</Text>

        <View style={styles.grid}>
          {deltas.map((d, i) => (
            <SubtestCard key={i} data={d} />
          ))}
        </View>
        {/* ACTION */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.buttonTextPrimary}>Kembali ke Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
