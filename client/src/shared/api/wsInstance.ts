import type { WsData, WsHandlers } from '@shared/types/ws';

/**
 * Проглатывает ожидаемые ошибки (send/close при гонках).
 * Используется вместо пустых catch.
 * @param _err - оригинальная ошибка (не используется)
 */
const swallow = (_err: unknown): void => { /* intentionally ignored */ };
let ws: WebSocket | null = null;

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
    if (ws) {
      try { ws.close(); } catch (e) { swallow(e); }
      ws = null;
    }

    const socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';
    ws = socket;

    socket.onopen = () => h.onOpen?.();
    socket.onerror = (e) => h.onError?.(e);
    socket.onmessage = (e) => h.onMessage?.(e.data as WsData);
    socket.onclose = (e) => {
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