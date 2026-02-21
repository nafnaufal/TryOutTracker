export type SubtestScore = {
  name: string;
  score: number;
};

export type Tryout = {
  id: string;
  date: string; // ISO
  subtest_scores: SubtestScore[];
  total_score: number;
};

export function computeTotal(subtests: SubtestScore[]) {
  return subtests.reduce((s, it) => s + (Number(it.score) || 0), 0);
}
