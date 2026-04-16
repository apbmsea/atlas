import { all, call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import type { FileInfo } from '@shared/types/file';
import { FilesAPI } from '@shared/api/instance';

// Простой in-memory кэш blob-URL по objectKey
const modelCache = new Map<string, string>(); // key -> blob url

const toError = (e: unknown) =>
  e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e);

function* fetchListWorker() {
  try {
    const list = yield* call(FilesAPI.list);
    yield* put(actions.fetchListSuccess(list));
  } catch (e) {
    yield* put(actions.fetchListFailure(toError(e)));
  }
}

function* fetchModelWorker(
  action: ReturnType<typeof actions.fetchModelRequest>
) {
  try {
    const { objectKey } = action.payload;

    // Кэш
    const cached = modelCache.get(objectKey);
    if (cached) {
      const info: FileInfo = yield* call(FilesAPI.info, objectKey);
      yield* put(actions.fetchModelSuccess({ url: cached, info }));
      return;
    }

    // Тянем glTF(JSON) + info параллельно
    const { gltfText, info }: { gltfText: string; info: FileInfo } = yield* all({
      gltfText: call(FilesAPI.gltf, objectKey),
      info: call(FilesAPI.info, objectKey),
    });

    // Создаём blob-URL для JSON glTF
    const blob = new Blob([gltfText], { type: 'model/gltf+json' });
    const url = URL.createObjectURL(blob);

    modelCache.set(objectKey, url); // кешируем
    yield* put(actions.fetchModelSuccess({ url, info }));
  } catch (e) {
    yield* put(actions.fetchModelFailure(toError(e)));
  }
}



function* uploadWorker(
  action: ReturnType<typeof actions.uploadRequest>
) {
  try {
    const { file } = action.payload;
    const info: FileInfo = yield* call(FilesAPI.upload, file);
    yield* put(actions.uploadSuccess(info));
  } catch (e) {
    yield* put(actions.uploadFailure(toError(e)));
  }
}



function* deleteWorker(
  action: ReturnType<typeof actions.deleteRequest>
) {
  try {
    const { objectKey } = action.payload;
    yield* call(FilesAPI.remove, objectKey);
    // Чистим кэш и отдаем экшен
    const url = modelCache.get(objectKey);
    if (url) {
      modelCache.delete(objectKey);
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    }
    yield* put(actions.deleteSuccess({ objectKey }));
  } catch (e) {
    yield* put(actions.deleteFailure(toError(e)));
  }
}

export function* model3dSaga() {
  yield* all([
    takeLatest(actions.fetchListRequest.type, fetchListWorker),
    takeLatest(actions.fetchModelRequest.type, fetchModelWorker),
    takeLatest(actions.uploadRequest.type, uploadWorker),
    takeLatest(actions.deleteRequest.type, deleteWorker),
  ])
}