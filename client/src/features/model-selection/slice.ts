import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const name = 'modelSelection' as const;

export type ModelSelectionState = {
  selectedModelId: string | null;
};

const initialState: ModelSelectionState = {
  selectedModelId: null,
};

export const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    selectModel(state, action: PayloadAction<string>) {
      state.selectedModelId = action.payload;
    },
    clearSelection(state) {
      state.selectedModelId = null;
    },
  },
});

