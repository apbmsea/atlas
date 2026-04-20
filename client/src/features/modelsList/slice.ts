import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileInfo } from '@shared/types/file';
import { actions as modelUploadActions } from '@features/modelUpload/slice';
import { actions as modelDeleteActions } from '@features/modelDelete/slice';
import type { State } from './type';

const initialState: State = {
  list: [],
  loading: false,
  error: null
};

export const { name, reducer, actions } = createSlice({
  name: 'modelsList',
  initialState,
  reducers: {
    /**
     * Запрашивает список доступных моделей.
     */
    fetchListRequest(state) {
      state.loading = true;
      state.error = null;
    },

    /**
     * Устанавливает список моделей после успешной загрузки.
     * @param payloadAction - список файлов
     */
    fetchListSuccess(state, payloadAction: PayloadAction<FileInfo[]>) {
      state.loading = false;
      state.list = payloadAction.payload;
    },

    /**
     * Устанавливает ошибку при получении списка моделей.
     * @param payloadAction - текст ошибки
     */
    fetchListFailure(state, payloadAction: PayloadAction<string>) {
      state.loading = false;
      state.error = payloadAction.payload;
    },
  },
  extraReducers: (builder) => {
    // После успешной загрузки файла добавляем его в начало списка
    builder.addCase(modelUploadActions.uploadSuccess, (state, payloadAction) => {
      state.list = [payloadAction.payload, ...state.list];
    });


    // После удаления файла — удаляем его из списка
    builder.addCase(modelDeleteActions.deleteSuccess, (state, payloadAction) => {
      state.list = state.list.filter(
        (fileInfo) => fileInfo.objectKey !== payloadAction.payload.objectKey
      );
    });
  },
});