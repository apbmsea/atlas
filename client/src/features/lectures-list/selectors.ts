import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@shared/types/store';
import type { LectureListItem } from '@shared/types/lecture';
import { name } from './slice';
import type { LecturesListState } from './type';

type Selector<T> = (state: RootState) => T;

export const selectLecturesListState: Selector<LecturesListState> = (state) =>
  state[name];

export const selectLectures: Selector<LectureListItem[]> = (state) =>
  selectLecturesListState(state).list;

export const selectLecturesLoading: Selector<boolean> = (state) =>
  selectLecturesListState(state).loading;

export const selectLecturesError: Selector<string | null> = (state) =>
  selectLecturesListState(state).error;

export interface LecturesListAggregated {
  list: LectureListItem[];
  loading: boolean;
  error: string | null;
}

export const selectors: Selector<LecturesListAggregated> = createSelector(
  [selectLectures, selectLecturesLoading, selectLecturesError],
  (list, loading, error) => ({ list, loading, error })
);
