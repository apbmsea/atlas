import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModelDeleteState } from './type';

const initialState: ModelDeleteState = {
  deleting: false,
  error: null
};

export const { name, reducer, actions } = createSlice({
  name: 'modelDelete',
  initialState,
  reducers: {
    /**
     * Запрашивает удаление модели по objectKey.
     * @param _payloadAction - { objectKey }
     */
    deleteRequest(state, _payloadAction: PayloadAction<{ objectKey: string }>) {
      state.deleting = true;
      state.error = null;
    },

    /**
     * Устанавливает результат успешного удаления модели.
     * @param _payloadAction - { objectKey }
     */
    deleteSuccess(state, _payloadAction: PayloadAction<{ objectKey: string }>) {
      state.deleting = false;
      state.error = null;
      // список и просмотр реагируют через extraReducers своих слайсов
    },

    /**
     * Устанавливает ошибку при удалении модели.
     * @param payloadAction.payload - текст ошибки
     */
    deleteFailure(state, {payload}: PayloadAction<string>) {
      state.deleting = false;
      state.error = payload;
    },
  },
});