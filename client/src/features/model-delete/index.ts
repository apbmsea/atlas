import { modelDeleteSaga } from './saga';
import { reducer, name, actions } from './slice';

export const ModelDeleteFeature = {
  sagas: {
    init: modelDeleteSaga
  },
  reducer: { [name]: reducer },
  actions
}
