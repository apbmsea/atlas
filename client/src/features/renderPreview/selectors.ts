import { name, type SelectorState } from './slice';

type RootLike = { [K in typeof name]: SelectorState };

export const selectors = {
  selectSlice: (s: RootLike) => s[name],

  selectStatus: (s: RootLike) => ({
    connecting: s[name].connecting,
    connected: s[name].connected,
    error: s[name].error,
  }),

  selectFrameUrl: (s: RootLike) => s[name].frameUrl,

  selectStats: (s: RootLike) => ({
    bytes: s[name].bytesReceived,
    dropped: s[name].dropped,
    last: s[name].lastFrameAt,
  }),
} as const;