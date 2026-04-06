import { all, call, cancelled, put, race, select, take, takeLatest } from 'typed-redux-saga';
import { eventChannel, type EventChannel } from 'redux-saga';
import { actions } from './slice';
import type { Deps, WsData, WsEvent } from './types';



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

const wsChan = (url: string): EventChannel<WsEvent> => eventChannel((emit) => {
  const ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onopen = () => emit({ type: 'open' });
  ws.onerror = () => emit({ type: 'error' });
  ws.onclose = (e: CloseEvent) => emit({ type: 'close', code: e.code, reason: e.reason, wasClean: e.wasClean });
  ws.onmessage = (e) => emit({ type: 'message', data: e.data as WsData });
  return () => { try { ws.close(); } catch {/* ignore */ } };
});



function* connectWorker(deps: Deps, { payload }: ReturnType<typeof actions.connectRequest>) {
  const chan: EventChannel<WsEvent> = yield* call(wsChan, deps.buildWsUrl(payload.modelId));
  let prevBlob: string | null = null;
  try {
    while (true) {
      const { ev, stop } = yield* race({ ev: take(chan), stop: take(actions.disconnectRequest.type) });
      if (stop) {
        yield* put(actions.disconnected(undefined)); break;
      }
      if (!ev) continue;
      if (ev.type === 'open') {
        yield* put(actions.connectSuccess()); continue;
      }
      if (ev.type === 'error') {
        yield* put(actions.connectFailure('WebSocket error')); continue;
      }
      if (ev.type === 'close') {
        yield* put(actions.disconnected({ reason: ev.reason })); break;
      }
      if (ev.type === 'message') {
        const f = toFrame(ev.data); if (!f) continue;
        revoke(prevBlob); prevBlob = f.isBlob ? f.url : null;
        yield* put(actions.frameReceived({ url: f.url, ts: Date.now(), bytes: f.bytes }));
      }
    }
  } finally {
    if (yield* cancelled()) yield* put(actions.disconnected(undefined));
    revoke(prevBlob);
    chan.close();
    yield* put(actions.clearFrame());
  }
}

export function* renderSaga(deps: Deps) {
  yield* takeLatest(actions.connectRequest.type, connectWorker, deps);
}