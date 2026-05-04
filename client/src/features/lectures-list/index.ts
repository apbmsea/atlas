import { lecturesListSaga } from './saga';
import { selectors } from './selectors';
import { reducer, name, actions } from './slice';

export {
  selectLectures,
  selectLecturesLoading,
  selectLecturesError,
  selectLecturesListState,
} from './selectors';

export const LecturesListFeature = {
  selectors,
  reducer: { [name]: reducer },
  sagas: { init: lecturesListSaga },
  actions,
} as const;
