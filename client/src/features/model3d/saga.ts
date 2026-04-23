import { all, call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import type { FileInfo } from '@shared/types/file';
import { FilesAPI } from '@shared/api/instance';
import { modelBlobCache } from '@shared/utils/modelBlobCache';
import { toError } from '@shared/utils/isHandledError';

/**
 * Загружает модель для просмотра.
 * @param action.payload
 * @param action.payload.objectKey
 */
function* fetchModelWorker(action: ReturnType<typeof actions.fetchModelRequest>) {
  try {
    yield* put(actions.setLoading(true));
    const { objectKey } = action.payload;

    const cachedUrl = modelBlobCache.get(objectKey);
    if (cachedUrl) {
      const fileInfo: FileInfo = yield* call(FilesAPI.info, objectKey);
      yield* put(actions.fetchModelSuccess({ url: cachedUrl, info: fileInfo }));
      return;
    }

    const { gltfText, info }: { gltfText: string; info: FileInfo } = yield* all({
      gltfText: call(FilesAPI.gltf, objectKey),
      info: call(FilesAPI.info, objectKey),
    });

    const blob = new Blob([gltfText], { type: 'model/gltf+json' });
    const blobUrl = URL.createObjectURL(blob);

    modelBlobCache.set(objectKey, blobUrl);
    yield* put(actions.fetchModelSuccess({ url: blobUrl, info }));
  } catch (error) {
    yield* put(actions.fetchModelFailure(toError(error)));
  }
}

/**
 * Вотчер для загрузки модели.
 */
export function* modelViewSaga() {
  yield* takeLatest(actions.fetchModelRequest, fetchModelWorker);
}