import { call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import type { Dispatch } from 'redux';
import { toFrame } from '@shared/utils/toFrame';
import type { WsApi } from '@shared/api/wsInstance';
import type { WsData } from '@shared/types/ws';
import { revokeBlob } from '@shared/utils/revorkeBlob';

/** Юнион всех экшенов фичи (строгий тип для dispatch). */
type RenderAction = ReturnType<(typeof actions)[keyof typeof actions]>;

/** Зависимости, которые провайдятся из rootSaga. */
export type Deps = {
  /** Построить URL для конкретной модели. */
  buildWsUrl: (id: string) => string;
  /** Инстанс WS. */
  ws: WsApi;
  /** Redux-dispatch. Нужен для вызовов из колбэков WS. */
  dispatch: Dispatch<RenderAction>;
};

/**
 * Открывает поток рендера и мапит события WS в экшены.
 * @param deps - провайденные зависимости (URL‑билдер, ws, dispatch)
 * @param action - экшен connectRequest с modelId
 * @returns Generator
 */
function* connectWorker(deps: Deps, { payload }: ReturnType<typeof actions.connectRequest>) {
  const url = deps.buildWsUrl(payload.modelId);
  let prevBlob: string | null = null;

  yield* call([deps.ws, deps.ws.connect], url, {
    onOpen: () => deps.dispatch(actions.connectSuccess()),
    onError: () => deps.dispatch(actions.connectFailure('WebSocket error')),
    onMessage: (data: WsData) => {
      const f = toFrame(data);
      if (!f) return;
      revokeBlob(prevBlob);
      prevBlob = f.isBlob ? f.url : null;
      deps.dispatch(actions.frameReceived({ url: f.url, ts: Date.now(), bytes: f.bytes }));
    },
    onClose: ({ reason }: { reason: string }) => {
      deps.dispatch(actions.disconnected({ reason: reason || undefined }));
      revokeBlob(prevBlob);
      deps.dispatch(actions.clearFrame());
    },
  });
}

/**
 * Закрывает текущее соединение потока рендера.
 * @param deps - провайденные зависимости с ws
 * @returns Generator
 */
function* disconnectWorker(deps: Deps) {
  yield* call([deps.ws, deps.ws.close]);
}

/**
 * Регистрирует вотчеры фичи:
 * - connectRequest — одно активное подключение (takeLatest);
 * - disconnectRequest — мягкое закрытие соединения.
 * @param deps - провайденные зависимости
 * @returns Generator
 */
export function* renderSaga(deps: Deps) {
  yield* takeLatest(actions.connectRequest.type, connectWorker, deps);
  yield* takeEvery(actions.disconnectRequest.type, disconnectWorker, deps);
}