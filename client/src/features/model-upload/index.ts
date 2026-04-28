import { modelUploadSaga } from './saga';
import { reducer, name, actions } from './slice';

export const ModelUploadFeature = {
  sagas: {
    init: modelUploadSaga
  },
  reducer: { [name]: reducer },
  actions
}
