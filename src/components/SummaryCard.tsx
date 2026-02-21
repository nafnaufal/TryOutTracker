import React from 'react';
import { View, Text } from 'react-native';
import { styles as globalStyles } from '../styles/globalStyles';

type Props = {
  totalScore: number;
  trend?: number;
  subtitle?: string;
};

export default function SummaryCard({ totalScore, trend, subtitle }: Props) {
  return (
    <View style={globalStyles.cardDark}>
      <Text style={globalStyles.bigNumber}>{totalScore}</Text>

      {subtitle && (
        <Text style={globalStyles.smallMuted}>{subtitle}</Text>
      )}

      {trend !== undefined && trend !== 0 && (
        <Text
          style={[
            globalStyles.trendText,
            { color: trend > 0 ? '#22c55e' : '#ef4444' },
          ]}
        >
          {trend > 0 ? '▲' : '▼'} {Math.abs(trend)} poin{!subtitle && ' dari tryout sebelumnya'}
        </Text>
      )}
    </View>
  );
}
