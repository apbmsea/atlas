export type RenderStreamState = {
  connecting: boolean;
  connected: boolean;
  error: string | null;

  modelId: string | null;

  frameUrl: string | null;  
  lastFrameAt: number | null;

  bytesReceived: number;
  dropped: number;
};

export type RenderStreamDeps = {
  buildWsUrl: (modelId: string) => string;
};

export type RenderViewerProps = { height?: number };
