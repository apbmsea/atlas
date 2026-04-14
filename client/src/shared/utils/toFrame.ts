import type { WsData } from "@shared/types/ws.types";

export const toFrame = (data: WsData): { url: string; bytes: number; isBlob: boolean } | null => {
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