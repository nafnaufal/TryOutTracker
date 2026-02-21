import { StyleSheet } from 'react-native';

const colors = {
  bg: '#f5f6fa',
  dark: '#0f172a',
  white: '#ffffff',
  muted: '#94a3b8',
  text: '#0f172a',
  soft: '#64748b',
  primary: '#2563eb',
  primarySoft: '#e5e7eb',
  seedBg: '#e2e8f0',
  warningBg: '#fef3c7',
  overlay: 'rgba(0,0,0,0.5)',
  inputBg: '#f1f5f9',
};

export const styles = StyleSheet.create({
  /* ---------- LAYOUT ---------- */

  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },

  screenContent: {
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.text,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.text,
  },

  bodyText: {
    fontSize: 14,
    color: colors.text,
  },

  /* ---------- CARDS ---------- */

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  cardElevated: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  cardDark: {
    backgroundColor: colors.dark,
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
  },

  cardRow: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* ---------- SUMMARY ---------- */

  bigNumber: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.white,
  },

  smallMuted: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 6,
  },

  trendText: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 14,
  },

  /* ---------- WARNING ---------- */

  warningCard: {
    backgroundColor: colors.warningBg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  /* ---------- SUB GRID ---------- */

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem: {
    width: '31%', // 3 kolom (31% + spacing ≈ 100%)
    marginBottom: 12,
  },
  subCode: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.soft,
    marginBottom: 6,
  },

  subScore: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },

  deltaText: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },

  /* ---------- INPUT ---------- */

  inputNumber: {
    width: 70,
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 8,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: colors.text,
  },

  inputText: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.text,
  },

  dateField: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  hintText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.soft,
  },

  /* ---------- BUTTONS ---------- */

  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonSecondary: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonSeed: {
    backgroundColor: colors.seedBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },

  buttonTextPrimary: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },

  buttonTextSecondary: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },

  buttonTextSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },

  buttonDelete: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },

  buttonTextDelete: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 11,
  },

  /* ---------- CHART ---------- */

  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },

  /* ---------- MODAL ---------- */

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
    color: colors.text,
  },

  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  closeText: {
    fontWeight: '800',
    color: '#334155',
  },

  /* ---------- ACTION BAR ---------- */

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 6,
    borderRadius: 4,
  },

  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 3,
  },

  historyAccent: {
    width: 6,
    backgroundColor: '#2563eb',
  },

  historyContent: {
    flex: 1,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  historyIndex: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },

  historyDate: {
    fontSize: 14,
    color: '#0f172a',
    marginTop: 4,
  },

  historyScore: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0f172a',
  },

  deleteText: {
    marginTop: 6,
    fontSize: 12,
    color: '#ef4444',
  },

  summaryBar: {
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },

  emptySubtitle: {
    fontSize: 14,
    marginTop: 6,
    color: '#64748b',
  },

  analyticsLabel: {
    flex: 1,
    fontSize: 13,
    color: '#64748b',
    paddingRight: 8,
  },

  analyticsValueSmall: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'right',
  },

  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  analyticsItem: {
    width: '48%',
    marginBottom: 16,
  },

  analyticsValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a',
  },

  consistencyBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  analyticsContainer: {
    marginBottom: 24,
  },

  analyticsHero: {
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  analyticsHeroTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  analyticsHeroText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 6,
  },

  analyticsKeyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  analyticsKeyCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    elevation: 3,
  },

  analyticsKeyValue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0f172a',
  },

  analyticsKeyLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
  },

  analyticsBreakdown: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    elevation: 2,
  },

  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  analyticsRowLabel: {
    fontSize: 14,
    color: '#64748b',
  },

  analyticsRowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  analyticsBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  analyticsTable: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },

  analyticsTableTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  analyticsTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
});
