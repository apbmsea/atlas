import { useEffect, useRef, type FC } from 'react';
import type { MouseEvent as ReactMouseEvent, WheelEvent as ReactWheelEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slice';
import { selectors } from '../selectors';
import type { RenderViewerProps } from '../types';
import { RenderFeature } from '..';
import { ModelSelectionFeature } from '@features/model-selection';
import {
  RENDER_VIEWER_AZIMUTH_WRAP_DEG,
  RENDER_VIEWER_DEFAULT_HEIGHT_PX,
  RENDER_VIEWER_DRAG_SEND_INTERVAL_MS,
  RENDER_VIEWER_ELEVATION_MAX_DEG,
  RENDER_VIEWER_ELEVATION_MIN_DEG,
  RENDER_VIEWER_EMPTY_STATE_OPACITY,
  RENDER_VIEWER_EMPTY_STATE_PADDING_TOP_PX,
  RENDER_VIEWER_ERROR_MARGIN_BOTTOM_PX,
  RENDER_VIEWER_MIN_ANGLE_CHANGE_DEG,
  RENDER_VIEWER_ROTATE_SENSITIVITY,
  RENDER_VIEWER_WHEEL_SEND_INTERVAL_MS,
  RENDER_VIEWER_WHEEL_ZOOM_FACTOR,
  RENDER_VIEWER_ZOOM_MAX,
  RENDER_VIEWER_ZOOM_MIN,
} from '@shared/constants/renderPreview';

export const RenderStreamViewer: FC<RenderViewerProps> = ({ height = RENDER_VIEWER_DEFAULT_HEIGHT_PX }) => {
  const dispatch = useDispatch();
  const { connected, error } = useSelector(selectors.selectStatus);
  const frameUrl = useSelector(selectors.selectFrameUrl);
  const modelId = useSelector(ModelSelectionFeature.selectors.selectSelectedModelId) as string | null;

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

  useEffect(() => {
    if (!modelId) {
      dispatch(actions.disconnectRequest());
      return;
    }
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

    rotationRef.current.azimuth -= dx * RENDER_VIEWER_ROTATE_SENSITIVITY;
    rotationRef.current.elevation += dy * RENDER_VIEWER_ROTATE_SENSITIVITY;

    rotationRef.current.azimuth =
      ((rotationRef.current.azimuth % RENDER_VIEWER_AZIMUTH_WRAP_DEG) + RENDER_VIEWER_AZIMUTH_WRAP_DEG) %
      RENDER_VIEWER_AZIMUTH_WRAP_DEG;
    rotationRef.current.elevation = Math.max(
      RENDER_VIEWER_ELEVATION_MIN_DEG,
      Math.min(RENDER_VIEWER_ELEVATION_MAX_DEG, rotationRef.current.elevation)
    );

    const now = performance.now();
    if (now - rotationRef.current.lastUpdateTime < RENDER_VIEWER_DRAG_SEND_INTERVAL_MS) return;

    const change =
      Math.abs(rotationRef.current.azimuth - rotationRef.current.lastSentAzimuth) +
      Math.abs(rotationRef.current.elevation - rotationRef.current.lastSentElevation);

    if (change < RENDER_VIEWER_MIN_ANGLE_CHANGE_DEG) return;

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
    if (now - rotationRef.current.lastWheelSend < RENDER_VIEWER_WHEEL_SEND_INTERVAL_MS) return;
    rotationRef.current.lastWheelSend = now;

    const dir = Math.sign(e.deltaY) || 1;
    const factor = dir > 0 ? RENDER_VIEWER_WHEEL_ZOOM_FACTOR : 1 / RENDER_VIEWER_WHEEL_ZOOM_FACTOR;

    rotationRef.current.zoom = Math.min(
      RENDER_VIEWER_ZOOM_MAX,
      Math.max(RENDER_VIEWER_ZOOM_MIN, rotationRef.current.zoom * factor)
    );

    sendRotate(false);
  };



  return (
    <div style={{ width: '100%' }}>
      {!modelId && (
        <div
          style={{
            opacity: RENDER_VIEWER_EMPTY_STATE_OPACITY,
            textAlign: 'center',
            paddingTop: RENDER_VIEWER_EMPTY_STATE_PADDING_TOP_PX,
          }}
        >
          Выберите модель из списка
        </div>
      )}
      {error && (
        <div style={{ marginBottom: RENDER_VIEWER_ERROR_MARGIN_BOTTOM_PX, color: 'var(--error)' }}>
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
          opacity: modelId ? 1 : 0,
          pointerEvents: modelId ? 'auto' : 'none',
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