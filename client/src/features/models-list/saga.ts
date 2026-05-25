import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { Api } from '@shared/api/instance';
import { toError } from '@shared/utils/isHandledError';

/**
 * Загружает список моделей из API и кладёт результат в стор.
 * @returns Generator — эффекты redux-saga
 */
function* fetchListWorker() {
  try {
    const filesList = yield* call(Api.files.list);
    yield* put(actions.fetchListSuccess(filesList));
  } catch (error: unknown) {
    yield* put(actions.fetchListFailure(toError(error)));
  }
}

/**
 * Вотчер для списка моделей.
 */
export function* modelsListSaga() {
  yield* takeLatest(actions.fetchListRequest, fetchListWorker);
}