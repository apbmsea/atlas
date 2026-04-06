import { combineReducers } from '@reduxjs/toolkit';
import { Model3dFeature } from '@features/model3d';
import { RenderFeature } from '@features/renderPreview';


export const rootReducer = combineReducers({
  ...RenderFeature.reducer,
  ...Model3dFeature.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;