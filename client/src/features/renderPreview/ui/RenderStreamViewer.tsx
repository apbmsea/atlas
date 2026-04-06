import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slice';
import { selectors } from '../selectors';
import type { RenderProps } from '../types';

export function RenderStreamViewer({ modelId, height = 320 }: RenderProps) {
  const dispatch = useDispatch();
  const { connecting, connected, error } = useSelector(selectors.selectStatus);
  const frameUrl = useSelector(selectors.selectFrameUrl);
  const stats = useSelector(selectors.selectStats);

  useEffect(() => {
    dispatch(actions.connectRequest({ modelId }));
    return () => { dispatch(actions.disconnectRequest()); };
  }, [dispatch, modelId]);

  const rotate = () => dispatch(actions.rotateRequest());



  return (
    <div>
      <div>
        <button onClick={rotate} disabled={!connected}>Rotate</button>
        <span>
          {connecting ? 'connecting…' : connected ? 'connected' : 'disconnected'}
        </span>
        {error && <span>{error}</span>}
        <span>
          bytes: {stats.bytes} dropped: {stats.dropped}
        </span>
      </div>
      <div>
        {frameUrl
          ? <img src={frameUrl} alt="render" />
          : <span>Waiting for frames…</span>}
      </div>
    </div>
  );
}