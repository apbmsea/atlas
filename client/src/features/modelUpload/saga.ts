import { call, put, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import { FilesAPI } from '@shared/api/instance';
import { toError } from '@shared/utils/isHandledError';

/**
 * Загружает модель в хранилище.
 */
function* uploadWorker(action: ReturnType<typeof actions.uploadRequest>) {
  try {
    yield* put(actions.setUploading(true));
    const { file } = action.payload;
    const uploadedFileInfo = yield* call(FilesAPI.upload, file);
    yield* put(actions.uploadSuccess(uploadedFileInfo));
  } catch (error) {
    yield* put(actions.uploadFailure(toError(error)));
  }
}

/**
 * Вотчер для загрузки модели.
 */
export function* modelUploadSaga() {
  yield* takeLatest(actions.uploadRequest.type, uploadWorker);
}