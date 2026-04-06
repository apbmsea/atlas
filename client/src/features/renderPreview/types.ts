export type RenderStreamState = {
  connecting: boolean;
  connected: boolean;
  error: string | null;

  modelId: string | null;

  frameUrl: string | null;   // data:... или blob:...
  lastFrameAt: number | null;

  bytesReceived: number;
  dropped: number;
};

export type RenderStreamDeps = {
  buildWsUrl: (modelId: string) => string;
};

export type WsData = string | ArrayBuffer | Blob;

export type WsEvent =
  | { type: 'open' }
  | { type: 'message'; data: WsData }
  | { type: 'error' }
  | { type: 'close'; code: number; reason: string; wasClean: boolean };

export type RenderProps = { modelId: string; height?: number };

export type Deps = { buildWsUrl: (id: string) => string }