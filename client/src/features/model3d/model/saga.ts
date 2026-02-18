import { all, call, put, takeLatest } from 'typed-redux-saga';
import { FilesAPI } from '@shared/api/files';
import type { FileInfo } from '@shared/api/files';
import { model3dActions } from './slice';

const toError = (e: unknown): string =>
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

    const { arrayBuffer, info }: { arrayBuffer: ArrayBuffer; info: FileInfo } = yield* all({
      arrayBuffer: call(FilesAPI.gltf, objectKey),
      info: call(FilesAPI.info, objectKey),
    });

    const blob = new Blob([arrayBuffer], { type: 'model/gltf-binary' });
    const url = URL.createObjectURL(blob);
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