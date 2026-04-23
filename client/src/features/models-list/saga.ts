import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { FilesAPI } from '@shared/api/instance';
import { toError } from '@shared/utils/isHandledError';

/**
 * Загружает список моделей из API.
 */
function* fetchListWorker() {
  try {
    const filesList = yield* call(FilesAPI.list);
    yield* put(actions.fetchListSuccess(filesList));
  } catch (error) {
    yield* put(actions.fetchListFailure(toError(error)));
  }
}

/**
 * Вотчер для списка моделей.
 */
export function* modelsListSaga() {
  yield* takeLatest(actions.fetchListRequest, fetchListWorker);
}