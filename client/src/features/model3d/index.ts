import { model3dSaga } from './saga';
import { selectors } from './selectors';
import { reducer, name, actions } from './slice';

export const Model3dFeature = {
    selectors,
    sagas: {
        init: model3dSaga
    },
    reducer: {[name]: reducer},
    actions
}

export { Model3DViewer } from './ui/Viewer';
