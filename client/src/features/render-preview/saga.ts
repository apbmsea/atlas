import { call, takeEvery, takeLatest } from 'typed-redux-saga';
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

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

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
    onOpen: () => {
      deps.dispatch(actions.connectSuccess());
      // Backend sends frames only after receiving a "rotate" message.
      deps.ws.send(
        JSON.stringify({
          type: 'rotate',
          azimuth: 0,
          elevation: 0,
          zoom: 1,
          final: false
        })
      );
    },
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
  // In dev/StrictMode React может смонтировать/размонтировать компонент до того,
  // как WebSocket успел перейти в OPEN. Закрытие на CONNECTING часто даёт
  // "WebSocket is closed before the connection is established".
  if (deps.ws.isOpen()) {
    yield* call([deps.ws, deps.ws.close]);
  }
}

function* rotateWorker(
  deps: Deps,
  action: ReturnType<typeof actions.rotateRequest>
) {
  const payload = action.payload;
  const azimuth = Number.isFinite(payload.azimuth) ? payload.azimuth : 0;
  const elevation = Number.isFinite(payload.elevation) ? payload.elevation : 0;
  const zoom = Number.isFinite(payload.zoom) ? payload.zoom : 1;
  const final = !!payload.final;

  const message = JSON.stringify({
    type: 'rotate',
    azimuth: Math.round(clamp(azimuth, -360, 360) * 10) / 10,
    elevation: Math.round(clamp(elevation, -80, 80) * 10) / 10,
    zoom: Math.round(clamp(zoom, 0.25, 4) * 1000) / 1000,
    final,
  });

  // typed-redux-saga требует yield в генераторе.
  yield* call([deps.ws, deps.ws.send], message);
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
  yield* takeEvery(actions.rotateRequest.type, rotateWorker, deps);
}