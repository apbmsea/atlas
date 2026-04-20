import { all, fork } from 'typed-redux-saga';
import { buildRenderWsUrl } from '@app/const/ws';
import { RenderFeature } from '@features/renderPreview';
import { store } from './store';
import { wsInstance } from '@shared/api/wsInstance';
import { modelsListSaga } from '@features/modelsList/saga';
import { modelViewSaga } from '@features/model3d/saga';
import { modelUploadSaga } from '@features/modelUpload/saga';
import { modelDeleteSaga } from '@features/modelDelete/saga';


export function* rootSaga() {
	yield all([
		fork(RenderFeature.sagas.init, {
			buildWsUrl: buildRenderWsUrl,
			ws: wsInstance,
			dispatch: store.dispatch,
		}),
	]);
	yield* all([
		fork(modelsListSaga),
		fork(modelViewSaga),
		fork(modelUploadSaga),
		fork(modelDeleteSaga),
	]);
}