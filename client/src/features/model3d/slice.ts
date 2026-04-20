import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileInfo } from '@shared/types/file';
import type { State } from './types';
import { actions as modelDeleteActions } from '@features/modelDelete/slice';


const initialState: State = {
  current: null,
  modelUrl: null,
  loading: false,
  error: null,
};

export const { name, reducer, actions } = createSlice({
  name: 'modelView',
  initialState,
  reducers: {
    /**
     * Запрашивает загрузку модели по objectKey.
     * @param _payloadAction - { objectKey }
     */
    fetchModelRequest(state, _payloadAction: PayloadAction<{ objectKey: string }>) {
      state.loading = true;
      state.error = null;
    },

    /**
     * Устанавливает URL модели и (опционально) FileInfo после успешной загрузки.
     * @param payloadAction - { url, info? }
     */
    fetchModelSuccess(
      state,
      payloadAction: PayloadAction<{ url: string; info?: FileInfo }>
    ) {
      state.loading = false;
      state.modelUrl = payloadAction.payload.url;
      state.current = payloadAction.payload.info ?? state.current ?? null;
    },

    /**
     * Устанавливает ошибку при загрузке модели.
     * @param payloadAction - текст ошибки
     */
    fetchModelFailure(state, payloadAction: PayloadAction<string>) {
      state.loading = false;
      state.error = payloadAction.payload;
    },

    /**
     * Полностью очищает текущее состояние просмотра модели.
     */
    clearModel(state) {
      state.modelUrl = null;
      state.current = null;
    },

    /**
     * Устанавливает флаг загрузки модели.
     * @param payloadAction - true/false
     */
    setLoading(state, payloadAction: PayloadAction<boolean>) {
      state.loading = payloadAction.payload;
      state.error = null;
    },

    /**
     * Устанавливает текущую модель (например, из списка).
     * @param payloadAction - FileInfo или null
     */
    setCurrent(state, payloadAction: PayloadAction<FileInfo | null>) {
      state.current = payloadAction.payload;
    },
  },
  extraReducers: (builder) => {
    // Если удалили открытую сейчас модель — очищаем её в состоянии просмотра
    builder.addCase(modelDeleteActions.deleteSuccess, (state, payloadAction) => {
      if (state.current?.objectKey === payloadAction.payload.objectKey) {
        state.current = null;
        state.modelUrl = null;
      }
    });
  },
});