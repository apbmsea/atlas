import type { WsData } from "@shared/types/ws";

/**
 * Преобразует входящие WS-данные к изображению: dataURL или blob URL.
 * @param d - полезная нагрузка сообщения WS
 * @returns объект с url/bytes и флагом isBlob, либо null если формат не поддержан
 */
export const toFrame = (d: WsData) => {
  // Some browsers / WS implementations may provide ArrayBufferView (Uint8Array/DataView)
  // even when binaryType is set. Convert it to ArrayBuffer-like bytes.
  if (ArrayBuffer.isView(d)) {
    // `d.buffer` can be `SharedArrayBuffer`, so avoid passing it directly to `Blob`.
    // Blob accepts ArrayBufferView (like Uint8Array) as parts.
    const bytesView = new Uint8Array(d.buffer, d.byteOffset, d.byteLength);
    // Ensure we pass an Uint8Array backed by a normal ArrayBuffer (not SharedArrayBuffer),
    // otherwise TypeScript may reject it for BlobPart.
    const copied = new Uint8Array(bytesView.byteLength);
    copied.set(bytesView);
    const b = new Blob([copied], { type: 'image/jpeg' });
    return {
      url: URL.createObjectURL(b),
      bytes: copied.byteLength,
      isBlob: true as const,
    };
  }
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