import type { RootState } from '@app/store/rootReducer';

export const selectors: Record<string, (s: RootState) => any> = {
  selectModel3D: (s: RootState) => s.model3d,
  selectFilesList: (s: RootState) => s.model3d.list,
  selectModelUrl: (s: RootState) => s.model3d.modelUrl,
  selectLoading: (s: RootState) => ({
    list: s.model3d.loadingList,
    model: s.model3d.loadingModel,
    upload: s.model3d.uploading,
    delete: s.model3d.deleting,
  }),
  selectError: (s: RootState) => s.model3d.error
}
