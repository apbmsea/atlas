import { useEffect, useMemo, useRef, useState } from 'react';
import { API_BASE_URL, WS_BASE_URL } from '@shared/config/apiBase';
import type { RenderProps } from '../types';
import { useSelector } from 'react-redux';
import { selectId } from '../selectors';

// to feat

export function RenderStreamViewer({ modelId, wsUrl, height = 320 }: RenderProps) {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const lastUrlRef = useRef<string | null>(null);


// to const folder (app)
  const resolvedWsUrl = useMemo(() => {
    if (wsUrl) return wsUrl;
    const wsBase = WS_BASE_URL(API_BASE_URL) ?? (typeof window !== 'undefined' ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}` : 'ws://localhost:8010');
    // По ТЗ порт 8010 и путь /ws/render/{modelId}. 
    // return `${wsBase.replace(/\/\/[^/]+/, '//<host>:8010')}/ws/render/${modelId}`;
    return `${wsBase.replace(/\/+$/, '')}/ws/render/${modelId}`;
  }, [wsUrl, modelId]);


  

  useEffect(() => {

    setError(null);

    const ws = new WebSocket(resolvedWsUrl);
    ws.binaryType = 'arraybuffer';


    ws.onopen = () => setConnected(true);
    ws.onerror = () => setError('WebSocket error');
    ws.onclose = () => setConnected(false);
// saga & slice
    ws.onmessage = (ev: MessageEvent) => {
      // чистим предыдущий frame URL
      if (lastUrlRef.current && lastUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(lastUrlRef.current);
        lastUrlRef.current = null;
      }

      let url: string | null = null;
      const data = ev.data;

      if (data instanceof ArrayBuffer) {
        const blob = new Blob([data], { type: 'image/jpeg' });
        url = URL.createObjectURL(blob);
      } else if (data instanceof Blob) {
        const type = (data as Blob).type || 'image/jpeg';
        url = URL.createObjectURL(new Blob([data], { type }));
      } else if (typeof data === 'string') {
        // может приходить base64 или data URL
        if (data.startsWith('data:image/')) {
          url = data;
        } else {
          // пробуем как base64 jpeg
          url = `data:image/jpeg;base64,${data}`;
        }
      }

      // acions
      if (url) {
        setFrameUrl(url);
        lastUrlRef.current = url;
      }
    };

    // saga
    wsRef.current = ws;
    return () => {
      ws.close();
      if (lastUrlRef.current && lastUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(lastUrlRef.current);
        lastUrlRef.current = null;
      }
    };
  }, [resolvedWsUrl]);


// slice
  const sendRotate = () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    // ТЗ: слать 'rotate'. На всякий случай поддержим и строку, и JSON.
    try {
      ws.send('rotate');
    } catch {
      try { ws.send(JSON.stringify({ action: 'rotate' })); } catch { /* empty */ }
    }
  };


  
  return (
    <div>
      <div>
        <button onClick={sendRotate} disabled={!connected}>Rotate</button>
        <span>
          {connected ? 'connected' : 'disconnected'}
        </span>
        {error && <span>{error}</span>}
      </div>
      <div>
        {frameUrl
          ? <img src={frameUrl} alt="render" />
          : <span>Waiting for frames…</span>
        }
      </div>
    </div>
  );
}