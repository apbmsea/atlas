import { renderSaga } from './saga';
import { selectors } from './selectors';
import { reducer, name, actions } from './slice';

export const RenderFeature = {
  selectors,
  sagas: {
    init: renderSaga,
  },
  reducer: { [name]: reducer },
  actions,
};

export { RenderStreamViewer } from './ui/RenderStreamViewer';