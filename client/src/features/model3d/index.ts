import { modelViewSaga } from './saga';
import { reducer, name, actions } from './slice';

export const ModelViewFeature = {
    sagas: {
        init: modelViewSaga
    },
    reducer: { [name]: reducer },
    actions,
}

export { Model3DViewer } from './ui/Viewer';
