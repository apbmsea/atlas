import { all, call, put, takeLatest } from 'typed-redux-saga';
import { FilesAPI, type FileInfo } from '@shared/api/files';
import { model3dActions } from './slice';

// Простой in-memory кэш blob-URL по objectKey
const modelCache = new Map<string, string>(); // key -> blob url

const toError = (e: unknown) =>
  e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e);

function* fetchListWorker() {
  try {
    const list: FileInfo[] = yield* call(FilesAPI.list);
    yield* put(model3dActions.fetchListSuccess(list));
  } catch (e) {
    yield* put(model3dActions.fetchListFailure(toError(e)));
  }
}

function* fetchModelWorker(
  action: ReturnType<typeof model3dActions.fetchModelRequest>
) {
  try {
    const { objectKey } = action.payload;

    // Кэш
    const cached = modelCache.get(objectKey);
    if (cached) {
      const info: FileInfo = yield* call(FilesAPI.info, objectKey);
      yield* put(model3dActions.fetchModelSuccess({ url: cached, info }));
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
    yield* put(model3dActions.fetchModelSuccess({ url, info }));
  } catch (e) {
    yield* put(model3dActions.fetchModelFailure(toError(e)));
  }
}

function* uploadWorker(
  action: ReturnType<typeof model3dActions.uploadRequest>
) {
  try {
    const { file } = action.payload;
    const info: FileInfo = yield* call(FilesAPI.upload, file);
    yield* put(model3dActions.uploadSuccess(info));
  } catch (e) {
    yield* put(model3dActions.uploadFailure(toError(e)));
  }
}

function* deleteWorker(
  action: ReturnType<typeof model3dActions.deleteRequest>
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
    yield* put(model3dActions.deleteSuccess({ objectKey }));
  } catch (e) {
    yield* put(model3dActions.deleteFailure(toError(e)));
  }
}

export function* model3dSaga() {
  yield* takeLatest(model3dActions.fetchListRequest.type, fetchListWorker);
  yield* takeLatest(model3dActions.fetchModelRequest.type, fetchModelWorker);
  yield* takeLatest(model3dActions.uploadRequest.type, uploadWorker);
  yield* takeLatest(model3dActions.deleteRequest.type, deleteWorker);
}