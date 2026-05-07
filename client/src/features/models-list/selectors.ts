import { createSelector } from '@reduxjs/toolkit';
import type { FileInfo } from '@shared/types/file';
import { name } from './slice';
import type { ModelListState } from './type';

type State = {
  [name]: ModelListState;
};

export const selectModelsListState = (state: State) => state[name];

export const selectModels = createSelector([selectModelsListState], (data) => data.list);

export const selectModelsLoading = createSelector([selectModelsListState], (data) => data.loading);

export const selectModelsError = createSelector([selectModelsListState], (data) => data.error);

export interface ModelsListAggregated {
  list: FileInfo[];
  loading: boolean;
  error: string | null;
}

export const selectors = createSelector(
  [selectModels, selectModelsLoading, selectModelsError],
  (list, loading, error): ModelsListAggregated => ({ list, loading, error })
);

