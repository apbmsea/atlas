import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { actions as modelDeleteActions } from '@features/model-delete/slice';
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
  extraReducers: (builder) => {
    builder.addCase(modelDeleteActions.deleteSuccess, (state, action) => {
      if (state.selectedModelId === action.payload.objectKey) {
        state.selectedModelId = null;
      }
    });
  },
});

