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

export type RenderProps = { modelId: string; height?: number };
