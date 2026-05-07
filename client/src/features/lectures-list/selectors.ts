import { createSelector } from '@reduxjs/toolkit';
import type { LectureListItem } from '@shared/types/lecture';
import { name } from './slice';
import type { LecturesListState } from './type';

type State = {
  [name]: LecturesListState;
};

export const selectLecturesListState = (state: State) => state[name];

export const selectLectures = createSelector([selectLecturesListState], (data) => data.list);

export const selectLecturesLoading = createSelector(
  [selectLecturesListState],
  (data) => data.loading
);

export const selectLecturesError = createSelector([selectLecturesListState], (data) => data.error);

export interface LecturesListAggregated {
  list: LectureListItem[];
  loading: boolean;
  error: string | null;
}

export const selectors = createSelector(
  [selectLectures, selectLecturesLoading, selectLecturesError],
  (list, loading, error): LecturesListAggregated => ({ list, loading, error })
);