/**
 * Лекция в списке профиля (данные с бэкенда после маппинга).
 */
export type LectureListItem = {
  id: string;
  title: string;
  sectionLabel: string;
  /** 0–100, либо null — просмотр не начат */
  progressPercent: number | null;
};
