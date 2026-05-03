import { reducer, name, actions } from './slice';
import { selectors } from './selectors';

export const ModelSelectionFeature = {
  reducer: { [name]: reducer },
  selectors,
  actions,
} as const;

