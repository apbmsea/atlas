import { call, takeEvery, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import type { Dispatch } from 'redux';
import { toFrame } from '@shared/utils/toFrame';
import type { WsApi } from '@shared/api/wsInstance';

type RenderAction = ReturnType<(typeof actions)[keyof typeof actions]>;
type Deps = {
  buildWsUrl: (id: string) => string;
  ws: WsApi;
  dispatch: Dispatch<RenderAction>;
};


const revokeBlob = (url?: string | null) => {
  if (url && url.startsWith('blob:')) { try { URL.revokeObjectURL(url); } catch { } }
};

function* connectWorker(deps: Deps, { payload }: ReturnType<typeof actions.connectRequest>) {
  const url = deps.buildWsUrl(payload.modelId);
  let prevBlob: string | null = null;

  yield* call([deps.ws, deps.ws.connect], url, {
    onOpen: () => deps.dispatch(actions.connectSuccess()),
    onError: () => deps.dispatch(actions.connectFailure('WebSocket error')),
    onMessage: (data) => {
      const f = toFrame(data);
      if (!f) return;
      revokeBlob(prevBlob);
      prevBlob = f.isBlob ? f.url : null;
      deps.dispatch(actions.frameReceived({ url: f.url, ts: Date.now(), bytes: f.bytes }));
    },
    onClose: ({ reason }) => {
      deps.dispatch(actions.disconnected({ reason: reason || undefined }));
      revokeBlob(prevBlob);
      deps.dispatch(actions.clearFrame());
    },
  });
}

function* disconnectWorker(deps: Deps) {
  yield* call([deps.ws, deps.ws.close]);
}

export function* renderSaga(deps: Deps) {
  yield* takeLatest(actions.connectRequest.type, connectWorker, deps);
  yield* takeEvery(actions.disconnectRequest.type, disconnectWorker, deps);
}