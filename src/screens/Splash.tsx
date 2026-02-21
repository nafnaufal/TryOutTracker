import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function Splash({ navigation }: Props) {
  useEffect(() => {
    const id = setTimeout(() => navigation.replace('Home'), 1200);
    return () => clearTimeout(id);
  }, [navigation]);

  return (
    <SafeAreaView
      style={styles.root}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={styles.logo} />
      <Text style={styles.title}>TryOutTracker</Text>
      <Text style={styles.subtitle}>Ringkasan & Trend Tryout</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: '#3478f6',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 6, color: '#666' },
});
