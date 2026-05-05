import { createSelector } from '@reduxjs/toolkit';
import { name} from './slice';
import { type RenderStreamState} from './types';

type State = { [name]: RenderStreamState };

const root = (state: State) => state[name]

// исправить selectors на select status
const selectStatus = createSelector([root], (rootData) => ({
  connecting: rootData.connecting,
  connected: rootData.connected,
  error: rootData.error,
}))

const selectStats = createSelector([root], (rootData) => ({
  bytes: rootData.bytesReceived,
  dropped: rootData.dropped,
  last: rootData.lastFrameAt,
}))

export const selectors = {
  selectSlice: (s: State) => s[name],
  selectFrameUrl: (s: State) => s[name].frameUrl,
  selectStatus,
  selectStats,
} as const;