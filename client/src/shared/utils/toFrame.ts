import type { WsData } from "@shared/types/ws";

/**
 * Преобразует входящие WS-данные к изображению: dataURL или blob URL.
 * @param d - полезная нагрузка сообщения WS
 * @returns объект с url/bytes и флагом isBlob, либо null если формат не поддержан
 */
export const toFrame = (d: WsData) => {
  if (d instanceof ArrayBuffer) {
    const b = new Blob([d], { type: 'image/jpeg' });
    return { url: URL.createObjectURL(b), bytes: d.byteLength, isBlob: true as const };
  }
  if (d instanceof Blob) {
    const b = new Blob([d], { type: d.type || 'image/jpeg' });
    return { url: URL.createObjectURL(b), bytes: b.size, isBlob: true as const };
  }
  if (typeof d === 'string') {
    if (d.startsWith('data:image/')) {
      const bytes = Math.floor((d.length - d.indexOf(',')) * 3 / 4);
      return { url: d, bytes, isBlob: false as const };
    }
    return { url: `data:image/jpeg;base64,${d}`, bytes: Math.floor(d.length * 3 / 4), isBlob: false as const };
  }
  return null;
};