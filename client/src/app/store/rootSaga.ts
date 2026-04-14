import { all, fork } from 'typed-redux-saga';
import { Model3dFeature } from '@features/model3d';
import { buildRenderWsUrl } from '@app/const/ws';
import { RenderFeature } from '@features/renderPreview';
import { store } from './store';
import { wsInstance } from '@shared/api/wsInstance';


export function* rootSaga() {
	yield all([
		fork(RenderFeature.sagas.init, {
			buildWsUrl: buildRenderWsUrl,
			ws: wsInstance,
			dispatch: store.dispatch,
		}),
		fork(Model3dFeature.sagas.init)
	]);
}