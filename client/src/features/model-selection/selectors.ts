import { name } from './slice';
import type { ModelSelectionState } from './type';


type StateWithModelSelection = Record<string, unknown> & {
  [name]: ModelSelectionState;
};

export const selectors: {
  selectSelectedModelId: (state: StateWithModelSelection) => string | null;
} = {
  selectSelectedModelId: (state) => state[name].selectedModelId,
};

