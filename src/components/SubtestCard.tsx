import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { PerSubtestDelta } from '../utils/trends';
import { styles as globalStyles } from '../styles/globalStyles';

type Props = {
  data: PerSubtestDelta;
  onPress?: () => void;
};

export default function SubtestCard({ data, onPress }: Props) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <View style={globalStyles.gridItem}>
      <Container
        style={globalStyles.cardElevated}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={globalStyles.subCode}>{data.code}</Text>

          {data.diff != null && (
            <Text style={[globalStyles.deltaText, { color: data.color }]}>
              {data.diff > 0
                ? `▲ +${data.diff}`
                : data.diff < 0
                ? `▼ ${data.diff}`
                : '—'}
            </Text>
          )}
        </View>

        {/* SCORE */}
        <Text style={[globalStyles.subScore, styles.score]}>
          {data.score}
        </Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    marginTop: 6,
  },
});
