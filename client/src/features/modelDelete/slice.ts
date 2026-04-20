import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { State } from './type';

const initialState: State = {
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
     * @param payloadAction - текст ошибки
     */
    deleteFailure(state, payloadAction: PayloadAction<string>) {
      state.deleting = false;
      state.error = payloadAction.payload;
    },

    /**
     * Устанавливает флаг "идёт удаление".
     * @param payloadAction - true/false
     */
    setDeleting(state, payloadAction: PayloadAction<boolean>) {
      state.deleting = payloadAction.payload;
      state.error = null;
    },
  },
});