import { model3dSaga } from '@features/model3d';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([
		model3dSaga()
	]);
}