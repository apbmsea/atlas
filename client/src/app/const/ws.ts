// .env (Vite): VITE_API_URL, VITE_WS_URL
const apiFromEnv = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined) as string | undefined;
const wsFromEnv = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_WS_URL : undefined) as string | undefined;

export const API_BASE_URL: string = apiFromEnv ?? '/api';

export const WS_BASE_URL: string = (() => {
  if (wsFromEnv) return wsFromEnv.replace(/\/+$/, '');
  // если WS не задан — берем схему/хост из API_BASE_URL или текущего окна
  try {
    const u = new URL(API_BASE_URL, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const proto = u.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${u.host}`;
  } catch {
    if (typeof window !== 'undefined') {
      const proto = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      return `${proto}${window.location.host}`;
    }
    return 'ws://localhost:8010';
  }
})();

export function buildRenderWsUrl(modelId: string): string {
  const base = WS_BASE_URL; // уже финальная строка
  return `${base}/ws/render/${encodeURIComponent(modelId)}`;
}