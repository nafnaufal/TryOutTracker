import { getCodeFromName } from '../constants/subtests';
import type { SubtestScore, Tryout } from '../models/tryout';

export type PerSubtestDelta = {
  name: string;
  code: string;
  score: number;
  diff: number | null;
  color: string;
  icon: string;
};

const COLOR_UP = '#22c55e';
const COLOR_DOWN = '#ef4444';
const COLOR_NEUTRAL = '#94a3b8';

export function totalTrend(latest?: Tryout | null, previous?: Tryout | null) {
  if (!latest || !previous) return 0;
  return latest.total_score - previous.total_score;
}

export function weakestSubtest(latest?: Tryout | null) {
  if (!latest || latest.subtest_scores.length === 0) return null;
  return latest.subtest_scores.reduce((min, cur) =>
    cur.score < min.score ? cur : min,
  );
}

function mapPrevScores(previous?: Tryout | null) {
  if (!previous) return new Map<string, number>();
  return new Map(previous.subtest_scores.map(s => [s.name, s.score]));
}

function diffMeta(diff: number | null) {
  if (diff == null) return { color: COLOR_NEUTRAL, icon: '' };
  if (diff > 0) return { color: COLOR_UP, icon: '▲' };
  if (diff < 0) return { color: COLOR_DOWN, icon: '▼' };
  return { color: COLOR_NEUTRAL, icon: '•' };
}

export function perSubtestDeltas(
  latest?: Tryout | null,
  previous?: Tryout | null,
): PerSubtestDelta[] {
  if (!latest) return [];

  const prevScores = mapPrevScores(previous);
  return latest.subtest_scores.map((s: SubtestScore) => {
    const prev = prevScores.get(s.name);
    const diff = prev == null ? null : s.score - prev;
    const meta = diffMeta(diff);

    return {
      name: s.name,
      code: getCodeFromName(s.name),
      score: s.score,
      diff,
      color: meta.color,
      icon: meta.icon,
    };
  });
}
