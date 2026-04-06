import { name, type SelectorState } from './slice';

type RootLike = { [K in typeof name]: SelectorState };

export const selectors = {
  selectModel3D: (s: RootLike) => s[name].current,
  selectFilesList: (s: RootLike) => s[name].list,
  selectModelUrl: (s: RootLike) => s[name].modelUrl,
  selectLoading: (s: RootLike) => ({
    list: s[name].loadingList,
    model: s[name].loadingModel,
    upload: s[name].uploading,
    delete: s[name].deleting,
  }),
  selectError: (s: RootLike) => s[name].error
}
