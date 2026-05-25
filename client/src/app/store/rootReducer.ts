import { combineReducers } from '@reduxjs/toolkit';
import { RenderFeature } from '@features/render-preview';
import { ModelViewFeature } from "@features/model-view";
import { ModelsListFeature } from "@features/models-list";
import { ModelUploadFeature } from "@features/model-upload";
import { ModelDeleteFeature } from "@features/model-delete";
import { ModelSelectionFeature } from '@features/model-selection';
import { LecturesListFeature } from '@features/lectures-list';


export const rootReducer = combineReducers({
  ...RenderFeature.reducer,
  ...ModelsListFeature.reducer,
  ...ModelSelectionFeature.reducer,
  ...ModelViewFeature.reducer,
  ...ModelUploadFeature.reducer,
  ...ModelDeleteFeature.reducer,
  ...LecturesListFeature.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;