import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Route } from '../../App';

export default function Splash({ navigate }: { navigate: (r: Route) => void }) {
  useEffect(() => {
    const id = setTimeout(() => navigate({ name: 'Home' }), 1200);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <View style={styles.root}>
      <View style={styles.logo} />
      <Text style={styles.title}>TryOutTracker</Text>
      <Text style={styles.subtitle}>Ringkasan & Trend Tryout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    logo: { width: 96, height: 96, borderRadius: 20, backgroundColor: '#3478f6', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 6, color: '#666' },
});
