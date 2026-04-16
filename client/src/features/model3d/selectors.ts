import { createSelector } from '@reduxjs/toolkit';
import { name, type SelectorState } from './slice';


type State = { [name]: SelectorState };

const root = (state: State) => state[name]

const selectStats = createSelector([root], (rootData) => ({
  list: rootData.loadingList,
  model: rootData.loadingModel,
  upload: rootData.uploading,
  delete: rootData.deleting,
}))

export const selectors = {
  selectModel3D: (s: State) => s[name].current,
  selectFilesList: (s: State) => s[name].list,
  selectModelUrl: (s: State) => s[name].modelUrl,
  selectError: (s: State) => s[name].error,
  selectStats,
}
