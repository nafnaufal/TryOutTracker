import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getAllTryouts } from '../utils/storage';
import { Tryout } from '../models/tryout';
import { getCodeFromName } from '../constants/subtests';
import {
  totalTrend as calcTotalTrend,
  perSubtestDeltas,
} from '../utils/trends';

import { styles } from '../styles/globalStyles';
import SubtestCard from '../components/SubtestCard';
import SummaryCard from '../components/SummaryCard';
import AnalyticsOverview from '../components/AnalyticsOverview';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [modalWidth, setModalWidth] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        const list = await getAllTryouts();
        if (isActive) setTryouts(list.reverse());
      })();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const latest = tryouts.at(-1);
  const previous = tryouts.at(-2);

  const totalTrend = useMemo(
    () => calcTotalTrend(latest, previous),
    [latest, previous],
  );

  const subs = useMemo(
    () => perSubtestDeltas(latest, previous),
    [latest, previous],
  );

  const totalChart = useMemo(
    () => {
      const numSubtests = latest?.subtest_scores.length || 1;
      const scores = tryouts.map(t => Math.round(t.total_score / numSubtests));
      const minScore = Math.min(...scores);
      const yMin = Math.min(minScore - 50, 300);
      const yMax = 1000;
      
      return {
        labels: tryouts.map((_, i) => `T${i + 1}`),
        datasets: [{ data: [...scores, yMin, yMax] }],
      };
    },
    [tryouts, latest],
  );

  const selectedSeries = useMemo(() => {
    if (!selectedSub) return null;

    const scores = tryouts.map(t => {
      const s = t.subtest_scores.find(x => x.name === selectedSub);
      return s?.score ?? 0;
    });
    
    const minScore = Math.min(...scores);
    const yMin = Math.min(minScore - 20, 300);
    const yMax = 1000;

    return {
      labels: tryouts.map((_, i) => `T${i + 1}`),
      datasets: [
        {
          data: [...scores, yMin, yMax],
        },
      ],
    };
  }, [selectedSub, tryouts]);

  const closeModal = () => {
    setSelectedSub(null);
    setModalWidth(0);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.title}>Dashboard SNBT</Text>

        {!latest ? (
          <View style={{ marginTop: 40 }}>
            <Text style={styles.bodyText}>
              Belum ada data tryout.
            </Text>

            <TouchableOpacity
              style={[styles.buttonPrimary, { marginTop: 16 }]}
              onPress={() => navigation.navigate('AddTryout')}
            >
              <Text style={styles.buttonTextPrimary}>
                + Tambah Tryout Pertama
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* SUMMARY */}
            <SummaryCard
              totalScore={Math.round(latest.total_score / latest.subtest_scores.length)}
              trend={totalTrend}
            />

            {/* ACTIONS */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => navigation.navigate('AddTryout')}
              >
                <Text style={styles.buttonTextPrimary}>
                  + Tambah
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('History')}
              >
                <Text style={styles.buttonTextSecondary}>
                  Riwayat
                </Text>
              </TouchableOpacity>
            </View>

            {/* TOTAL CHART */}
            <Text style={styles.sectionTitle}>
              Trend Total Skor
            </Text>

            <LineChart
              data={totalChart}
              width={Dimensions.get('window').width - 32}
              height={220}
              bezier
              fromZero={false}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#0f172a',
                backgroundGradientFrom: '#0f172a',
                backgroundGradientTo: '#0f172a',
                decimalPlaces: 0,
                color: (opacity = 1) =>
                  `rgba(255,255,255,${opacity})`,
                labelColor: () => '#94a3b8',
              }}
              yLabelsOffset={10}
              yAxisSuffix=""
              yAxisLabel=""
              style={styles.chart}
              withVerticalLines={false}
              getDotColor={() => '#60a5fa'}
              segments={7}
            />

            {/* ANALYTICS */}
            <AnalyticsOverview tryouts={tryouts} />

            {/* SUBTEST GRID */}
            <Text style={styles.sectionTitle}>
              Detail per Subtes
            </Text>

            <View style={styles.grid}>
              {subs.map((d, i) => (
                <SubtestCard
                  key={i}
                  data={d}
                  onPress={() => setSelectedSub(d.name)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={!!selectedSub}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={styles.modalCard}
            onLayout={e =>
              setModalWidth(e.nativeEvent.layout.width)
            }
          >
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={closeModal}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {selectedSub &&
              selectedSeries &&
              modalWidth > 0 && (
                <>
                  <Text style={styles.modalTitle}>
                    {getCodeFromName(selectedSub)} —{' '}
                    {selectedSub}
                  </Text>

                  <LineChart
                    data={selectedSeries}
                    width={modalWidth - 40}
                    height={260}
                    bezier
                    fromZero={false}
                    yAxisInterval={1}
                    chartConfig={{
                      backgroundColor: '#0f172a',
                      backgroundGradientFrom: '#0f172a',
                      backgroundGradientTo: '#0f172a',
                      decimalPlaces: 0,
                      color: (opacity = 1) =>
                        `rgba(255,255,255,${opacity})`,
                      labelColor: () => '#94a3b8',
                    }}
                    segments={7}
                    yLabelsOffset={10}
                    withVerticalLines={false}
                    getDotColor={() => '#60a5fa'}
                    style={{ borderRadius: 16 }}
                  />
                </>
              )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}