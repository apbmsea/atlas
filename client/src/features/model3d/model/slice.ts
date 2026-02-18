import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FileInfo } from '@shared/api/files';

export type Model3DState = {
  list: FileInfo[];
  current?: FileInfo | null;
  modelUrl?: string | null;
  loadingList: boolean;
  loadingModel: boolean;
  uploading: boolean;
  deleting: boolean;
  error?: string | null;
};

const initialState: Model3DState = {
  list: [],
  current: null,
  modelUrl: null,
  loadingList: false,
  loadingModel: false,
  uploading: false,
  deleting: false,
  error: null,
};

const slice = createSlice({
  name: 'model3d',
  initialState,
  reducers: {
    fetchListRequest(state) { state.loadingList = true; state.error = null; },
    fetchListSuccess(state, action: PayloadAction<FileInfo[]>) {
      state.loadingList = false; state.list = action.payload;
    },
    fetchListFailure(state, action: PayloadAction<string>) {
      state.loadingList = false; state.error = action.payload;
    },

    fetchModelRequest(state, _action: PayloadAction<{ objectKey: string }>) {
      state.loadingModel = true; state.error = null;
    },
    fetchModelSuccess(state, action: PayloadAction<{ url: string; info?: FileInfo }>) {
      state.loadingModel = false;
      state.modelUrl = action.payload.url;
      state.current = action.payload.info ?? state.current ?? null;
    },
    fetchModelFailure(state, action: PayloadAction<string>) {
      state.loadingModel = false; state.error = action.payload;
    },
    clearModel(state) {
      state.modelUrl = null; state.current = null;
    },

    uploadRequest(state, _action: PayloadAction<{ file: File }>) {
      state.uploading = true; state.error = null;
    },
    uploadSuccess(state, action: PayloadAction<FileInfo>) {
      state.uploading = false;
      state.list = [action.payload, ...state.list];
    },
    uploadFailure(state, action: PayloadAction<string>) {
      state.uploading = false; state.error = action.payload;
    },

    deleteRequest(state, _action: PayloadAction<{ objectKey: string }>) {
      state.deleting = true; state.error = null;
    },
    deleteSuccess(state, action: PayloadAction<{ objectKey: string }>) {
      state.deleting = false;
      state.list = state.list.filter(f => f.objectKey !== action.payload.objectKey);
      if (state.current?.objectKey === action.payload.objectKey) {
        state.current = null; state.modelUrl = null;
      }
    },
    deleteFailure(state, action: PayloadAction<string>) {
      state.deleting = false; state.error = action.payload;
    },
  },
});

export const model3dActions = slice.actions;
export const model3dReducer = slice.reducer;