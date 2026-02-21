import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const screenWidth = Dimensions.get('window').width;

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
    () => ({
      labels: tryouts.map((_, i) => `T${i + 1}`),
      datasets: [{ data: tryouts.map(t => t.total_score) }],
    }),
    [tryouts],
  );

  const selectedSeries = useMemo(() => {
    if (!selectedSub) return null;

    return {
      labels: tryouts.map((_, i) => `T${i + 1}`),
      datasets: [
        {
          data: tryouts.map(t => {
            const s = t.subtest_scores.find(x => x.name === selectedSub);
            return s?.score ?? 0;
          }),
        },
      ],
    };
  }, [selectedSub, tryouts]);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.title}>Dashboard SNBT</Text>

        {latest ? (
          <>
            {/* SUMMARY */}
            <SummaryCard totalScore={latest.total_score} trend={totalTrend} />
            {/* NAV BUTTONS */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => navigation.navigate('AddTryout')}
              >
                <Text style={styles.buttonTextPrimary}>+ Tambah</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('History')}
              >
                <Text style={styles.buttonTextSecondary}>Riwayat</Text>
              </TouchableOpacity>
            </View>
            {/* CHART */}
            <Text style={styles.sectionTitle}>Trend Total Skor</Text>
            <LineChart
              data={totalChart}
              width={screenWidth - 32}
              height={220}
              bezier
              chartConfig={{
                backgroundColor: '#0f172a',
                backgroundGradientFrom: '#0f172a',
                backgroundGradientTo: '#0f172a',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                labelColor: () => '#94a3b8',
              }}
              style={styles.chart}
            />

            <AnalyticsOverview tryouts={tryouts} />

            <Text style={styles.sectionTitle}>Detail per Subtes</Text>

            <View style={styles.grid}>
              {subs.map((d, i) => (
                <SubtestCard
                  key={i}
                  data={d}
                  onPress={() => setSelectedSub(d.name)}
                />
              ))}
            </View>

            {/* MODAL */}
            {/* MODAL */}
            <Modal
              visible={!!selectedSub}
              animationType="fade"
              transparent
              onRequestClose={() => setSelectedSub(null)}
            >
              <View style={styles.modalOverlay}>
                <View
                  style={styles.modalCard}
                  onLayout={e => {
                    setModalWidth(e.nativeEvent.layout.width);
                  }}
                >
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedSub(null)}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>

                  {selectedSub && selectedSeries && modalWidth > 0 && (
                    <>
                      <Text style={styles.modalTitle}>
                        {getCodeFromName(selectedSub)} — {selectedSub}
                      </Text>

                      <LineChart
                        data={selectedSeries}
                        width={modalWidth - 40} // minus padding modal
                        height={260}
                        bezier
                        chartConfig={{
                          backgroundColor: '#0f172a',
                          backgroundGradientFrom: '#0f172a',
                          backgroundGradientTo: '#0f172a',
                          decimalPlaces: 0,
                          color: (opacity = 1) =>
                            `rgba(255,255,255,${opacity})`,
                          labelColor: () => '#94a3b8',
                        }}
                        style={{ borderRadius: 16 }}
                      />
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Text style={styles.bodyText}>Belum ada data tryout.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
