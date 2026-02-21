// SUBTESTS: array of full subtest names. Codes will be derived automatically
const SUBTESTS: string[] = [
  'Penalaran Umum',
  'Pengetahuan dan Pemahaman Umum',
  'Kemampuan Memahami Bacaan dan Menulis',
  'Pengetahuan Kuantitatif',
  'Literasi Bahasa Indonesia',
  'Literasi Bahasa Inggris',
  'Penalaran Matematika',
];

export default SUBTESTS;

export function getCodeFromName(name: string) {
  const caps = name.match(/[A-Z]/g);
  if (caps && caps.length > 0) return caps.join('');
  // fallback: take first letters of words (up to 3)
  return name
    .split(/\s+|&|-/)
    .filter(Boolean)
    .map(w => w[0]?.toUpperCase() ?? '')
    .slice(0, 3)
    .join('');
}

export { SUBTESTS };
