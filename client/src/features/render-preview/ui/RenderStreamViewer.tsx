import { useEffect, useRef, type FC } from 'react';
import type { MouseEvent as ReactMouseEvent, WheelEvent as ReactWheelEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slice';
import { selectors } from '../selectors';
import type { RenderProps } from '../types';
import { RenderFeature } from '..';

export const RenderStreamViewer: FC<RenderProps> = ({ modelId, height = 320 }) => {
  const dispatch = useDispatch();
  const { connected, error } = useSelector(selectors.selectStatus);
  const frameUrl = useSelector(selectors.selectFrameUrl);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef({
    azimuth: 0,
    elevation: 0,
    zoom: 1,
    isDragging: false,
    lastSentAzimuth: 0,
    lastSentElevation: 0,
    lastUpdateTime: 0,
    lastWheelSend: 0,
  });

  const ROTATE_SENSITIVITY = 0.35;
  const UPDATE_INTERVAL_MS = 45;
  const MIN_ANGLE_CHANGE = 0.35;
  const MIN_ELEV = -80;
  const MAX_ELEV = 80;
  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 4;

  useEffect(() => {
    // Вынести в сагу которую триггерит клик по модельке
    dispatch(actions.connectRequest({ modelId }));
    return () => { dispatch(actions.disconnectRequest()); };
  }, [dispatch, modelId]);

  useEffect(() => {
    // Reset rotation state when model changes
    rotationRef.current.azimuth = 0;
    rotationRef.current.elevation = 0;
    rotationRef.current.zoom = 1;
    rotationRef.current.isDragging = false;
    rotationRef.current.lastSentAzimuth = 0;
    rotationRef.current.lastSentElevation = 0;
    rotationRef.current.lastUpdateTime = 0;
    rotationRef.current.lastWheelSend = 0;
  }, [modelId]);

  const sendRotate = (final: boolean) => {
    if (!connected) return;
    const r = rotationRef.current;
    dispatch(
      RenderFeature.actions.rotateRequest({
        azimuth: r.azimuth,
        elevation: r.elevation,
        zoom: r.zoom,
        final,
      })
    );
  };

  const onMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!connected) return;
    e.preventDefault();
    rotationRef.current.isDragging = true;
    rotationRef.current.lastUpdateTime = performance.now();
  };

  const onMouseUp = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!rotationRef.current.isDragging) return;
    e.preventDefault();
    rotationRef.current.isDragging = false;
    sendRotate(true);
  };

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!connected) return;
    if (!rotationRef.current.isDragging) return;

    const dx = e.nativeEvent.movementX ?? 0;
    const dy = e.nativeEvent.movementY ?? 0;

    rotationRef.current.azimuth -= dx * ROTATE_SENSITIVITY;
    rotationRef.current.elevation += dy * ROTATE_SENSITIVITY;

    rotationRef.current.azimuth = ((rotationRef.current.azimuth % 360) + 360) % 360;
    rotationRef.current.elevation = Math.max(
      MIN_ELEV,
      Math.min(MAX_ELEV, rotationRef.current.elevation)
    );

    const now = performance.now();
    if (now - rotationRef.current.lastUpdateTime < UPDATE_INTERVAL_MS) return;

    const change =
      Math.abs(rotationRef.current.azimuth - rotationRef.current.lastSentAzimuth) +
      Math.abs(rotationRef.current.elevation - rotationRef.current.lastSentElevation);

    if (change < MIN_ANGLE_CHANGE) return;

    rotationRef.current.lastSentAzimuth = rotationRef.current.azimuth;
    rotationRef.current.lastSentElevation = rotationRef.current.elevation;
    rotationRef.current.lastUpdateTime = now;

    sendRotate(false);
  };

  const onMouseLeave = (_e: ReactMouseEvent<HTMLDivElement>) => {
    if (!rotationRef.current.isDragging) return;
    rotationRef.current.isDragging = false;
    sendRotate(true);
  };

  const onWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (!connected) return;
    e.preventDefault();

    const now = performance.now();
    if (now - rotationRef.current.lastWheelSend < 45) return;
    rotationRef.current.lastWheelSend = now;

    const dir = Math.sign(e.deltaY) || 1;
    const factor = dir > 0 ? 1.07 : 1 / 1.07;

    rotationRef.current.zoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, rotationRef.current.zoom * factor)
    );

    sendRotate(false);
  };



  return (
    <div style={{ width: '100%' }}>
      {error && (
        <div style={{ marginBottom: 8, color: 'var(--error)' }}>
          {error}
        </div>
      )}
      <div
        ref={wrapperRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        role="application"
        style={{
          width: '100%',
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          touchAction: 'none',
          cursor: connected ? 'grab' : 'default',
        }}
      >
        {frameUrl
          ? (
            <img
              src={frameUrl}
              alt="render"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )
          : <span>Waiting for frames…</span>}
      </div>
    </div>
  );
}