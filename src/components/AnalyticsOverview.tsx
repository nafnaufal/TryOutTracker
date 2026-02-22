import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Tryout } from '../models/tryout';
import { styles } from '../styles/globalStyles';

type Props = {
  tryouts: Tryout[];
};

function average(arr: number[]) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

function stdDev(arr: number[]) {
  if (arr.length < 2) return 0;
  const avg =
    arr.reduce((a, b) => a + b, 0) / arr.length; // jangan pakai average() biar tidak double round

  const variance =
    arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) /
    arr.length;

  return Math.sqrt(variance);
}

export default function AnalyticsOverview({ tryouts }: Props) {
  const analysis = useMemo(() => {
    if (!tryouts.length) return null;

    // ================= TOTAL =================
    // total_score sudah berupa jumlah, jangan dibagi lagi
    const totals = tryouts.map(t => t.total_score);

    const overallAvg = average(totals);
    
    // Untuk setiap tryout, ambil skor tertinggi dari subtest-nya
    const highestSubtestScores = tryouts.map(t => {
      const subtestScores = t.subtest_scores.map(s => s.score);
      return Math.max(...subtestScores);
    });
    
    // Hitung rata-rata dari skor tertinggi
    const avgHighest = average(highestSubtestScores);

    const totalStd = stdDev(totals);

    // Threshold lebih realistis untuk total (misal total 0–7000)
    const consistencyLabel =
      totalStd < 30 ? 'Konsisten' : 'Fluktuatif';

    // ================= SUBTEST =================
    const subMap: Record<
      string,
      { scores: number[]; downCount: number }
    > = {};

    tryouts.forEach((t, index) => {
      t.subtest_scores.forEach(s => {
        if (!subMap[s.name]) {
          subMap[s.name] = { scores: [], downCount: 0 };
        }

        subMap[s.name].scores.push(s.score);

        if (index > 0) {
          const prev =
            tryouts[index - 1].subtest_scores.find(
              x => x.name === s.name,
            )?.score ?? 0;

          if (s.score < prev) {
            subMap[s.name].downCount += 1;
          }
        }
      });
    });

    let bestSub = '';
    let bestAvg = -Infinity;

    let unstableSub = '';
    let highestStd = -Infinity;

    let mostDownSub = '';
    let mostDownCount = -Infinity;

    Object.entries(subMap).forEach(([name, data]) => {
      const avgScore = average(data.scores);
      const deviation = stdDev(data.scores);

      if (avgScore > bestAvg) {
        bestAvg = avgScore;
        bestSub = name;
      }

      if (deviation > highestStd) {
        highestStd = deviation;
        unstableSub = name;
      }

      if (data.downCount > mostDownCount) {
        mostDownCount = data.downCount;
        mostDownSub = name;
      }
    });

    return {
      overallAvg,
      avgHighest,
      bestSub,
      unstableSub,
      mostDownSub,
      consistencyLabel,
    };
  }, [tryouts]);

  if (!analysis) return null;

  return (
    <View style={styles.analyticsContainer}>
      {/* STATISTIK UMUM */}
      <View style={styles.analyticsTable}>
        <Text style={styles.analyticsTableTitle}>Statistik Umum</Text>

        <View style={styles.analyticsTableRow}>
          <Text style={styles.analyticsLabel}>Rata-rata</Text>
          <Text style={styles.analyticsValueSmall}>
            {analysis.overallAvg}
          </Text>
        </View>

        <View style={styles.analyticsTableRow}>
          <Text style={styles.analyticsLabel}>
            Rata-rata Skor Tertinggi
          </Text>
          <Text style={styles.analyticsValueSmall}>
            {analysis.avgHighest}
          </Text>
        </View>

        <View style={styles.analyticsTableRow}>
          <Text style={styles.analyticsLabel}>
            Konsistensi
          </Text>

          <View
            style={[
              styles.analyticsBadge,
              {
                backgroundColor:
                  analysis.consistencyLabel === 'Konsisten'
                    ? '#e6f9f0'
                    : '#fff1f2',
              },
            ]}
          >
            <Text
              style={{
                fontWeight: '700',
                color:
                  analysis.consistencyLabel === 'Konsisten'
                    ? '#0f5132'
                    : '#9f1239',
              }}
            >
              {analysis.consistencyLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* ANALISIS SUBTES */}
      <View style={styles.analyticsTable}>
        <Text style={styles.analyticsTableTitle}>
          Analisis Subtes
        </Text>

        <View style={styles.analyticsTableRow}>
          <Text style={styles.analyticsLabel}>
            Subtes Terbaik
          </Text>
          <Text style={styles.analyticsValueSmall}>
            {analysis.bestSub}
          </Text>
        </View>

        <View style={styles.analyticsTableRow}>
          <Text style={styles.analyticsLabel}>
            Paling Fluktuatif
          </Text>
          <Text style={styles.analyticsValueSmall}>
            {analysis.unstableSub}
          </Text>
        </View>

        <View style={styles.analyticsTableRow}>
          <Text style={styles.analyticsLabel}>
            Paling Sering Turun
          </Text>
          <Text style={styles.analyticsValueSmall}>
            {analysis.mostDownSub}
          </Text>
        </View>
      </View>
    </View>
  );
}