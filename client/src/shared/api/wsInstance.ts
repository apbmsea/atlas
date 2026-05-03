import type { WsData, WsHandlers } from '@shared/types/ws';

/**
 * Проглатывает ожидаемые ошибки (send/close при гонках).
 * Используется вместо пустых catch.
 * @param _err - оригинальная ошибка (не используется)
 */
const swallow = (_err: unknown): void => { /* intentionally ignored */ };
let ws: WebSocket | null = null;
let connId = 0;

/** Тип данных, которые принимает WebSocket */
type SendData = Parameters<WebSocket['send']>[0];

/**
 * Инстанс WebSocket
 */
export const wsInstance = {
  /**
   * Открывает соединение и навешивает обработчики.
   * @param url - адрес WS-сервера
   * @param h - колбэки жизненного цикла
   * @returns void
   */
  connect(url: string, h: WsHandlers = {}): void {
    // Avoid closing an in-flight CONNECTING socket.
    // In React dev/StrictMode connect/disconnect races can trigger:
    // "WebSocket is closed before the connection is established".
    if (ws) {
      try {
        if (ws.readyState === WebSocket.OPEN) ws.close();
      } catch (e) {
        swallow(e);
      }
      ws = null;
    }

    const myId = ++connId;

    const socket = new WebSocket(url);
    // Backend sends JPEG bytes as binary messages.
    // The original app uses `binaryType='blob'`, so keep the same format for easier rendering.
    socket.binaryType = 'blob';
    ws = socket;

    socket.onopen = () => {
      if (myId !== connId) return;
      h.onOpen?.();
    };
    socket.onerror = (e) => {
      if (myId !== connId) return;
      h.onError?.(e);
    };
    socket.onmessage = (e) => {
      if (myId !== connId) return;
      h.onMessage?.(e.data as WsData);
    };
    socket.onclose = (e) => {
      if (myId !== connId) return;
      h.onClose?.({ code: e.code, reason: e.reason, wasClean: e.wasClean });
      ws = null;
    };
  },

  /**
   * Отправляет данные в открытое соединение.
   * Безопасно игнорирует вызов, если сокет не открыт.
   * @param data - строка/буфер/Blob для отправки
   * @returns void
   */
  send(data: SendData): void {
    if (ws && ws.readyState === WebSocket.OPEN) {
      try { ws.send(data); } catch (e) { swallow(e); }
    }
  },

  /**
   * Закрывает активное соединение (если оно есть).
   * @returns void
   */
  close(): void {
    if (ws) {
      try { ws.close(); } catch (e) { swallow(e); }
    }
  },

  /**
   * Проверяет, открыто ли текущее соединение.
   * @returns true, если сокет существует и в состоянии OPEN
   */
  isOpen(): boolean {
    return !!ws && ws.readyState === WebSocket.OPEN;
  },
} as const;

export type WsApi = typeof wsInstance;