import { actions } from '@features/renderPreview/slice';

export type WsData = string | ArrayBuffer | Blob;
export type RenderAction = ReturnType<(typeof actions)[keyof typeof actions]>;

export type WsHandlers = {
  onOpen?: () => void;
  onError?: (ev: Event) => void;
  onClose?: (info: { code: number; reason: string; wasClean: boolean }) => void;
  onMessage?: (data: WsData) => void;
};

