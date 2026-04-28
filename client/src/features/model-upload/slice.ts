import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileInfo } from '@shared/types/file';
import type { ModelUploadState } from './type';


const initialState: ModelUploadState = {
  uploading: false,
  error: null
};

export const { name, reducer, actions } = createSlice({
  name: 'modelUpload',
  initialState,
  reducers: {
    /**
     * Запрашивает загрузку файла модели.
     * @param _payloadAction - { file }
     */
    uploadRequest(state, _payloadAction: PayloadAction<{ file: File }>) {
      state.uploading = true;
      state.error = null;
    },

    /**
     * Устанавливает результат успешной загрузки файла.
     * @param payloadAction - FileInfo загруженного файла
     */
    uploadSuccess(state, payloadAction: PayloadAction<FileInfo>) {
      state.uploading = false;
      state.error = null;
      // список обновляется в modelsList через extraReducers
    },

    /**
     * Устанавливает ошибку при загрузке файла.
     * @param payloadAction - текст ошибки
     */
    uploadFailure(state, payloadAction: PayloadAction<string>) {
      state.uploading = false;
      state.error = payloadAction.payload;
    },

    /**
     * Устанавливает флаг "идёт загрузка".
     * @param payloadAction - true/false
     */
    setUploading(state, payloadAction: PayloadAction<boolean>) {
      state.uploading = payloadAction.payload;
      state.error = null;
    },
  },
});