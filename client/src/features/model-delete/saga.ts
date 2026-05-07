import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { Api } from '@shared/api/instance';
import { modelBlobCache } from '@shared/utils/modelBlobCache';
import { toError } from '@shared/utils/isHandledError';

/**
 * Удаляет модель из хранилища и очищает blob-URL в кэше.
 * @param action - экшен deleteRequest с payload { objectKey: string }
 * @returns Generator — эффекты redux-saga
 */
function* deleteWorker(action: ReturnType<typeof actions.deleteRequest>) {
  try {
    const { objectKey } = action.payload;

    yield* call(Api.files.remove, objectKey);
    modelBlobCache.revokeAndDelete(objectKey);

    yield* put(actions.deleteSuccess({ objectKey }));
  } catch (error) {
    yield* put(actions.deleteFailure(toError(error)));
  }
}

/**
 * Вотчер для удаления модели.
 */
export function* modelDeleteSaga() {
  yield* takeLatest(actions.deleteRequest, deleteWorker);
}