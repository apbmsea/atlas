import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { LecturesAPI } from '@shared/api/instance';
import { isHandledError, toError } from '@shared/utils/isHandledError';

function* fetchListWorker() {
  try {
    const list = yield* call(LecturesAPI.list);
    yield* put(actions.fetchListSuccess(list));
  } catch (error: unknown) {
    if (isHandledError(error) && error.status === 404) {
      yield* put(actions.fetchListSuccess([]));
      return;
    }
    yield* put(actions.fetchListFailure(toError(error)));
  }
}

export function* lecturesListSaga() {
  yield* takeLatest(actions.fetchListRequest, fetchListWorker);
}
