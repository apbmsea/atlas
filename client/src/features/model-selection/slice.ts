import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


export type ModelSelectionState = {
  selectedModelId: string | null;
};

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

