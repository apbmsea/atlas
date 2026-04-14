import { call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import type { Dispatch } from 'redux';
import { toFrame } from '@shared/utils/toFrame';
import type { WsApi } from '@shared/api/wsInstance';
import type { WsData } from '@shared/types/ws.types';

type RenderAction = ReturnType<(typeof actions)[keyof typeof actions]>;
type Deps = {
  buildWsUrl: (id: string) => string;
  ws: WsApi;
  dispatch: Dispatch<RenderAction>;
};

// move to utils
const revokeBlob = (url?: string | null) => {
  if (url && url.startsWith('blob:')) { try { URL.revokeObjectURL(url); } catch { } }
};

// add js-doc vezde
function* connectWorker(deps: Deps, { payload }: ReturnType<typeof actions.connectRequest>) {
  const url = deps.buildWsUrl(payload.modelId);
  let prevBlob: string | null = null;

  yield* call(deps.ws.connect, url, {
    onOpen: () => put(actions.connectSuccess()),
    onError: () => put(actions.connectFailure('WebSocket error')),
    onMessage: (data:WsData) => {
      const f = toFrame(data);
      if (!f) return;
      revokeBlob(prevBlob);
      prevBlob = f.isBlob ? f.url : null;
      put(actions.frameReceived({ url: f.url, ts: Date.now(), bytes: f.bytes }));
    },
    onClose: ({ reason }) => {
      put(actions.disconnected({ reason }));
      revokeBlob(prevBlob);
      put(actions.clearFrame());
    },
  });
}

function* disconnectWorker(deps: Deps) {
  yield* call([deps.ws, deps.ws.close]);
}

export function* renderSaga(deps: Deps) {
  yield* takeLatest(actions.connectRequest, connectWorker, deps);
  yield* takeEvery(actions.disconnectRequest, disconnectWorker, deps);
}