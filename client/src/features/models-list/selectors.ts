import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@shared/types/store';
import type { FileInfo } from '@shared/types/file';
import { name } from './slice';
import type { ModelListState } from './type'; // проверь точное имя интерфейса

type Selector<T> = (state: RootState) => T;

export const selectModelsListState: Selector<ModelListState> = (state) => state[name];

export const selectModels: Selector<FileInfo[]> = (state) =>
  selectModelsListState(state).list;

export const selectModelsLoading: Selector<boolean> = (state) =>
  selectModelsListState(state).loading;

export const selectModelsError: Selector<string | null> = (state) =>
  selectModelsListState(state).error;

export interface ModelsListAggregated {
  list: FileInfo[];
  loading: boolean;
  error: string | null;
}

export const selectors: Selector<ModelsListAggregated> = createSelector(
  [selectModels, selectModelsLoading, selectModelsError],
  (list, loading, error) => ({ list, loading, error })
);