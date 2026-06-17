import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { FilesAPI } from '@shared/api/instance';
import { modelBlobCache } from '@shared/utils/modelBlobCache';
import { toError } from '@shared/utils/isHandledError';

/**
 * Удаляет модель и чистит кэш blob‑URL.
 */
function* deleteWorker(action: ReturnType<typeof actions.deleteRequest>) {
  try {
    yield* put(actions.setDeleting(true));
    const { objectKey } = action.payload;

    yield* call(FilesAPI.remove, objectKey);
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
  yield* takeLatest(actions.deleteRequest.type, deleteWorker);
}