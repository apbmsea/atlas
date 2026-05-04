import type { LectureListItem } from '@shared/types/lecture';

export type LecturesListState = {
  list: LectureListItem[];
  loading: boolean;
  error: string | null;
};
