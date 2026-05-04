import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LectureListItem } from '@shared/types/lecture';
import type { LecturesListState } from './type';

const initialState: LecturesListState = {
  list: [],
  loading: false,
  error: null,
};

export const { name, reducer, actions } = createSlice({
  name: 'lecturesList',
  initialState,
  reducers: {
    fetchListRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchListSuccess(state, action: PayloadAction<LectureListItem[]>) {
      state.loading = false;
      state.list = Array.isArray(action.payload) ? action.payload : [];
    },
    fetchListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
