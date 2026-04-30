// .env (Vite): VITE_API_URL, VITE_WS_URL
const apiFromEnv = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined) as string | undefined;
const wsFromEnv = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_WS_URL : undefined) as string | undefined;

/**
 * На некоторых окружениях `localhost` резолвится в `::1` (IPv6), а сервер слушает только IPv4.
 * Тогда WebSocket может "закрываться до установления". Форсим IPv4 loopback.
 */
const forceIpv4Localhost = (url: string): string =>
  url
    .replace(/\[::1\]/g, '127.0.0.1')
    .replace(/\blocalhost\b/g, '127.0.0.1');

export const API_BASE_URL: string = apiFromEnv
  ? forceIpv4Localhost(apiFromEnv)
  : '/api';

export const WS_BASE_URL: string = (() => {
  // Если API_BASE_URL абсолютный (например http://127.0.0.1:8010) —
  // всегда вычисляем WS из него (это надежнее, чем полагаться на VITE_WS_URL).
  if (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')) {
    const u = new URL(API_BASE_URL);
    const proto = u.protocol === 'https:' ? 'wss:' : 'ws:';
    return forceIpv4Localhost(`${proto}//${u.host}`);
  }

  // Иначе API_BASE_URL может быть относительным ('/api'):
  // fallback на явно заданный VITE_WS_URL или текущий window.location.
  if (wsFromEnv) return forceIpv4Localhost(wsFromEnv.replace(/\/+$/, ''));

  try {
    const u = new URL(API_BASE_URL, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const proto = u.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${u.host}`;
  } catch {
    if (typeof window !== 'undefined') {
      const proto = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      return forceIpv4Localhost(`${proto}${window.location.host}`);
    }
    return 'ws://127.0.0.1:8010';
  }
})();

export function buildRenderWsUrl(modelId: string): string {
  const base = WS_BASE_URL; // уже финальная строка
  return `${base}/ws/render/${encodeURIComponent(modelId)}`;
}