// import { createSelector } from '@reduxjs/toolkit';
// import { name } from './slice';
// import type { Model3DState } from './types';


// type State = { [name]: Model3DState };

// const root = (state: State) => state[name]

// const selectStats = createSelector([root], (rootData) => ({
//   list: rootData.loadingList,
//   model: rootData.loadingModel,
//   upload: rootData.uploading,
//   delete: rootData.deleting,
// }))

// const selectModel3D = createSelector(root, (rootData) => rootData.current)
// export const selectors = {
//   selectModel3D,
//   selectFilesList: (s: State) => s[name].list,
//   selectModelUrl: (s: State) => s[name].modelUrl,
//   selectError: (s: State) => s[name].error,
//   selectStats,
// }

// // Если понадобиться то есть черновик

