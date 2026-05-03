import { actions } from '@features/render-preview/slice';

export type WsData = string | ArrayBuffer | Blob | ArrayBufferView;
export type RenderAction = ReturnType<(typeof actions)[keyof typeof actions]>;

export type WsHandlers = {
  onOpen?: () => void;
  onError?: (ev: Event) => void;
  onClose?: (info: { code: number; reason: string; wasClean: boolean }) => void;
  onMessage?: (data: WsData) => void;
};

