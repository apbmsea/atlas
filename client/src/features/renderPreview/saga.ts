import { all, call, cancelled, getContext, put, race, select, setContext, take, takeEvery, takeLatest } from 'typed-redux-saga';
import { actions } from './slice';
import type { WsData, WsEvent } from './types';


export type Deps = {
  buildWsUrl: (id: string) => string
}

// в utils helper
const toFrame = (data: WsData): { url: string; bytes: number; isBlob: boolean } | null => {
  if (data instanceof ArrayBuffer) {
    const blob = new Blob([data], { type: 'image/jpeg' });
    return { url: URL.createObjectURL(blob), bytes: data.byteLength, isBlob: true };
  }
  if (data instanceof Blob) {
    const type = data.type || 'image/jpeg';
    const blob = new Blob([data], { type });
    return { url: URL.createObjectURL(blob), bytes: blob.size, isBlob: true };
  }
  if (typeof data === 'string') {
    if (data.startsWith('data:image/')) {
      const bytes = Math.floor((data.length - data.indexOf(',')) * 3 / 4);
      return { url: data, bytes, isBlob: false };
    }
    const bytes = Math.floor(data.length * 3 / 4);
    return { url: `data:image/jpeg;base64,${data}`, bytes, isBlob: false };
  }
  return null;
};

const revoke = (url?: string | null) => {
  if (url && url.startsWith('blob:')) {
    try { URL.revokeObjectURL(url); } catch { /* ignore */ }
  }
};

const closeActiveWS: (() => void) | null = null;

// перенести в wsInstance, что бы все обработчики были сами по себе 
function* connectWorker(deps: Deps, { payload }: ReturnType<typeof actions.connectRequest>) {
  const url = deps.buildWsUrl(payload.modelId);
  const ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';

  let prevBlob: string | null = null;

  yield* setContext({
    renderClose: () => { try { ws.close(); } catch { /* ignore */ } },
  });

  ws.onopen = () => (actions.connectSuccess());
  ws.onerror = () => (actions.connectFailure('WebSocket error'));
  ws.onmessage = (e: MessageEvent) => {
    const f = toFrame(e.data as WsData);
    if (!f) return;
    revoke(prevBlob);
    prevBlob = f.isBlob ? f.url : null;
    (actions.frameReceived({ url: f.url, ts: Date.now(), bytes: f.bytes }));
  };


  yield* call(() => new Promise<void>((resolve) => {
    ws.onclose = (e: CloseEvent) => {
      (actions.disconnected({ reason: e.reason || undefined }));
      revoke(prevBlob);
      (actions.clearFrame());
      resolve();
    };
  }));
}

function* disconnectWorker() {
  const fn = closeActiveWS;
  if (fn) {
    yield* call(fn); // аккуратно закрываем существующее соединение
  }
}

// не работает, а хотелось бы | какой тип нужен
// function* disconnectWorker() {
//   const close: (() => void) | undefined = yield* getContext('renderClose');
//   if (close) {
//     yield* call(close);
//   }
// }


export function* renderSaga(deps: Deps) {
  yield* takeLatest(actions.connectRequest.type, connectWorker, deps);
  yield* takeEvery(actions.disconnectRequest.type, disconnectWorker);
}