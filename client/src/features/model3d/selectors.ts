import type { RootState } from '@app/store/rootReducer';

// спросить про типы
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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





