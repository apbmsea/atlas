import type { RootState } from '@app/store/rootReducer';

export const selectModel3D = (s: RootState) => s.model3d;
export const selectFilesList = (s: RootState) => s.model3d.list;
export const selectModelUrl = (s: RootState) => s.model3d.modelUrl;
export const selectLoading = (s: RootState) => ({
  list: s.model3d.loadingList,
  model: s.model3d.loadingModel,
  upload: s.model3d.uploading,
  delete: s.model3d.deleting,
});
export const selectError = (s: RootState) => s.model3d.error;