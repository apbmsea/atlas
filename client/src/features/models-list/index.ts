import { modelsListSaga } from './saga';
import { reducer, name, actions } from './slice';

export const ModelsListFeature = {
  sagas: {
    init: modelsListSaga
  },
  reducer: { [name]: reducer },
  actions
}
