import { modelsListSaga } from './saga';
import { selectors } from './selectors';
import { reducer, name, actions } from './slice';

// если хочешь — дополнительно реэкспортируй раздельные селекторы
export { selectModels, selectModelsLoading, selectModelsError, selectModelsListState } from './selectors';

export const ModelsListFeature = {
  selectors,
  reducer: { [name]: reducer },
  sagas: { init: modelsListSaga },
  actions,
} as const;