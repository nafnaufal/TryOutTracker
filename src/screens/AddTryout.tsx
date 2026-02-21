import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { computeTotal, Tryout } from '../models/tryout';
import { saveTryout } from '../utils/storage';
import SUBTESTS, { getCodeFromName } from '../constants/subtests';
import { styles } from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTryout'>;

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function AddTryout({ navigation }: Props) {
  const [scores, setScores] = useState<number[]>(() =>
    Array(SUBTESTS.length).fill(0),
  );
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const subtestScores = useMemo(
    () =>
      SUBTESTS.map((name, i) => ({
        name,
        score: scores[i] ?? 0,
      })),
    [scores],
  );

  const total = useMemo(() => computeTotal(subtestScores), [subtestScores]);

  const formatDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS !== 'ios') setShowPicker(false);
    if (event.type === 'dismissed') return;
    if (date) setSelectedDate(date);
  };

  const setAt = (i: number, value: string) => {
    const numeric = Number(value.replace(/[^0-9]/g, ''));

    setScores(prev => {
      const copy = [...prev];
      copy[i] = isNaN(numeric) ? 0 : numeric;
      return copy;
    });
  };

  const onSave = async () => {
    if (saving) return;

    // 🚨 Validasi minimal
    if (subtestScores.every(s => s.score === 0)) {
      Alert.alert('Skor kosong', 'Masukkan minimal satu skor.');
      return;
    }

    setSaving(true);

    const tryout: Tryout = {
      id: makeId(),
      date: selectedDate.toISOString(),
      subtest_scores: subtestScores,
      total_score: total,
    };

    try {
      await saveTryout(tryout);
      navigation.replace('Result', { id: tryout.id });
    } catch (e) {
      Alert.alert('Gagal menyimpan', String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.screenContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Tambah Tryout</Text>

        {/* TOTAL CARD */}
        <View style={styles.cardDark}>
          <Text style={styles.smallMuted}>Total Sementara</Text>
          <Text style={styles.bigNumber}>{total}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tanggal (opsional)</Text>
          <TouchableOpacity
            style={styles.dateField}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.bodyText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
          <Text style={styles.hintText}>
            Default: hari ini. Tap untuk ubah.
          </Text>
          {showPicker && (
            <View style={{ marginTop: 12 }}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onDateChange}
              />
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={[styles.buttonSecondary, { marginTop: 8 }]}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.buttonTextSecondary}>Selesai</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Input Skor per Subtes</Text>

        {SUBTESTS.map((s, i) => (
          <View key={s} style={styles.cardRow}>
            <View>
              <Text style={styles.subCode}>{getCodeFromName(s)}</Text>
              <Text style={styles.bodyText}>{s}</Text>
            </View>

            <TextInput
              keyboardType="number-pad"
              value={scores[i] ? String(scores[i]) : ''}
              onChangeText={t => setAt(i, t)}
              placeholder="0"
              maxLength={4}
              style={styles.inputNumber}
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.buttonPrimary, saving && { opacity: 0.6 }]}
          onPress={onSave}
          disabled={saving}
        >
          <Text style={styles.buttonTextPrimary}>
            {saving ? 'Menyimpan...' : 'Simpan Tryout'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
