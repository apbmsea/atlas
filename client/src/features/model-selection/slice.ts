import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModelSelectionState } from './type';

const initialState: ModelSelectionState = {
  selectedModelId: null,
};

export const { name, reducer, actions } = createSlice({
  name: 'modelSelection',
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

