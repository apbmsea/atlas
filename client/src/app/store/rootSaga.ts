import { Model3dFeature } from '@features/model3d';
import { all, fork } from 'typed-redux-saga';

export function* rootSaga() {
	yield all([
		fork(Model3dFeature.sagas.init)
	]);
}