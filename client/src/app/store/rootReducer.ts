import { combineReducers } from '@reduxjs/toolkit';
import { model3dReducer } from '@features/model3d';

const rootReducer = combineReducers({
  model3d: model3dReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
