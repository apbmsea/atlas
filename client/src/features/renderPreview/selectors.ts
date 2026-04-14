import { createSelector } from '@reduxjs/toolkit';
import { name, type SelectorState } from './slice';

type State = { [name]: SelectorState };

const root = (state: State) => state[name]

/** */
const selectStatus = createSelector([root], (rootData) => ({
  connecting: rootData.connecting,
  connected: rootData.connected,
  error: rootData.error,
}))

export const selectors = {
  selectSlice: (s: State) => s[name],

  selectStatus,

  selectFrameUrl: (s: RootLike) => s[name].frameUrl,

  selectStats: (s: RootLike) => ({
    bytes: s[name].bytesReceived,
    dropped: s[name].dropped,
    last: s[name].lastFrameAt,
  }),
} as const;