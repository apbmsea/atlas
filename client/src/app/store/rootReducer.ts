import { combineReducers } from '@reduxjs/toolkit';
import { Model3dFeature } from '@features/model3d';

export const rootReducer = combineReducers({
  ...Model3dFeature.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
