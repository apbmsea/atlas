import { combineReducers } from '@reduxjs/toolkit';
import { RenderFeature } from '@features/renderPreview';
import { ModelViewFeature } from "@features/model3d";
import { ModelsListFeature } from "@features/modelsList";
import { ModelUploadFeature } from "@features/modelUpload";
import { ModelDeleteFeature } from "@features/modelDelete";


export const rootReducer = combineReducers({
  ...RenderFeature.reducer,
  ...ModelsListFeature.reducer,
  ...ModelViewFeature.reducer,
  ...ModelUploadFeature.reducer,
  ...ModelDeleteFeature.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;