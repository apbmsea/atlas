import { all, fork } from 'typed-redux-saga';
import { buildRenderWsUrl } from '@app/const/ws';
import { RenderFeature } from '@features/render-preview';
import { store } from './store';
import { wsInstance } from '@shared/api/wsInstance';
import { ModelsListFeature } from '@features/models-list';
import { ModelViewFeature } from '@features/model-view';
import { ModelUploadFeature } from '@features/model-upload';
import { ModelDeleteFeature } from '@features/model-delete';


export function* rootSaga() {
	
	yield all([
		fork(RenderFeature.sagas.init, {
			buildWsUrl: buildRenderWsUrl,
			ws: wsInstance,
			dispatch: store.dispatch,
		}),

		fork(ModelsListFeature.sagas.init),
		fork(ModelViewFeature.sagas.init),
		fork(ModelUploadFeature.sagas.init),
		fork(ModelDeleteFeature.sagas.init),
	]);
}