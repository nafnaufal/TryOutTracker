import { Tryout } from '../models/tryout';
let AsyncStorage: any = null;
try {
  // optional dependency; will work if project has it installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = null;
}

const KEY = 'TRYOUT_LIST_V1';

let memoryStore: Tryout[] = [];

export async function getAllTryouts(): Promise<Tryout[]> {
  if (AsyncStorage) {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  }
  return memoryStore.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function saveTryout(t: Tryout): Promise<void> {
  if (AsyncStorage) {
    const list = await getAllTryouts();
    const withNew = [t, ...list];
    await AsyncStorage.setItem(KEY, JSON.stringify(withNew));
    return;
  }
  memoryStore = [t, ...memoryStore];
}

export async function getTryoutById(id: string): Promise<Tryout | null> {
  const list = await getAllTryouts();
  return list.find((t) => t.id === id) ?? null;
}
