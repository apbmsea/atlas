import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { toError } from '@shared/utils/isHandledError';

/**
 * Загружает список моделей из API и кладёт результат в стор.
 * @returns Generator — эффекты redux-saga
 */
function* fetchListWorker({api: ApiInterface}: Type) {
  try {
    const filesList = yield* call(ApiInterface.list);
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