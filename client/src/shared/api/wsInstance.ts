import type { WsData, WsHandlers } from "@shared/types/ws.types";

let ws: WebSocket | null = null;

export const wsInstance = {
  connect(url: string, h: WsHandlers = {}) {
    if (ws) { try { ws.close(); } catch { /* empty */ } ws = null; }

    const s = new WebSocket(url);
    s.binaryType = 'arraybuffer';
    ws = s;

    s.onopen = () => h.onOpen?.();
    s.onerror = (e) => h.onError?.(e);
    s.onmessage = (e) => h.onMessage?.(e.data as WsData);
    s.onclose = (e) => { h.onClose?.({ code: e.code, reason: e.reason, wasClean: e.wasClean }); ws = null; };
  },

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (ws && ws.readyState === WebSocket.OPEN) { try { ws.send(data as any); } catch { /* empty */ } }
  },

  close() { if (ws) { try { ws.close(); } catch { /* empty */ } } },

  isOpen() { return !!ws && ws.readyState === WebSocket.OPEN; },
} as const;

export type WsApi = typeof wsInstance;