import { createAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RenderStreamState } from './types';

const initialState: RenderStreamState = {
  connecting: false,
  connected: false,
  error: null,

  modelId: null,

  frameUrl: null,
  lastFrameAt: null,

  bytesReceived: 0,
  dropped: 0,
};
export type SelectorState = typeof initialState;

export const { name, reducer, actions: RenderActions } = createSlice({
  name: 'render',
  initialState,
  reducers: {
    connectRequest: (state, action: PayloadAction<{ modelId: string }>) => {
      state.connecting = true;
      state.connected = false;
      state.error = null;
      state.modelId = action.payload.modelId;
      state.frameUrl = null;
      state.lastFrameAt = null;
      state.bytesReceived = 0;
      state.dropped = 0;
    },
    connectSuccess(state) {
      state.connecting = false;
      state.connected = true;
      state.error = null;
    },
    connectFailure(state, action: PayloadAction<string>) {
      state.connecting = false;
      state.connected = false;
      state.error = action.payload;
    },
    disconnected(state, action: PayloadAction<{ reason?: string } | undefined>) {
      state.connecting = false;
      state.connected = false;
      state.error = action.payload?.reason ?? state.error;
    },

    frameReceived(state, action: PayloadAction<{ url: string; ts: number; bytes: number }>) {
      state.frameUrl = action.payload.url;
      state.lastFrameAt = action.payload.ts;
      state.bytesReceived += action.payload.bytes;
    },
    frameDropped(state) {
      state.dropped += 1;
    },
    clearFrame(state) {
      state.frameUrl = null;
      state.lastFrameAt = null;
    },
  },
});

export type RotateRequestPayload = {
  azimuth: number;
  elevation: number;
  zoom: number;
  final?: boolean;
};

export const actions = {
  ...RenderActions,
  disconnectRequest: createAction(`${name}/disconnectRequest`),
  rotateRequest: createAction<RotateRequestPayload>(`${name}/rotateRequest`),
};