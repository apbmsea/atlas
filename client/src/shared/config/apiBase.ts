export const API_BASE_URL =
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined) ?? '/api';

export const WS_BASE_URL =
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_WS_URL : undefined) ??
  (() => {
    // Если WS не задан, берём схему из API_BASE_URL
    try {
      const u = new URL(API_BASE_URL, window.location.origin);
      const wsProtocol = u.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${wsProtocol}//${u.host}`;
    } catch {
      const wsProto = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      return `${wsProto}${window.location.host}`;
    }
  })();

// render feat