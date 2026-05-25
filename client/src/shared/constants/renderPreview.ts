/**
 * Константы для фичи render-preview.
 * Держим в shared, чтобы UI и saga использовали одинаковые ограничения/тайминги.
 */

/** Высота viewer по умолчанию (px). */
export const RENDER_VIEWER_DEFAULT_HEIGHT_PX = 700;

/** Чувствительность вращения (deg на px движения мыши). */
export const RENDER_VIEWER_ROTATE_SENSITIVITY = 0.35;

/** Минимальный интервал между отправками rotate при drag (мс). */
export const RENDER_VIEWER_DRAG_SEND_INTERVAL_MS = 45;

/** Минимальная суммарная дельта (azimuth+elevation), чтобы отправлять rotate. */
export const RENDER_VIEWER_MIN_ANGLE_CHANGE_DEG = 0.35;

/** Ограничение наклона камеры (elevation) — нижняя граница (deg). */
export const RENDER_VIEWER_ELEVATION_MIN_DEG = -80;
/** Ограничение наклона камеры (elevation) — верхняя граница (deg). */
export const RENDER_VIEWER_ELEVATION_MAX_DEG = 80;

/** Ограничение масштаба — минимальный zoom. */
export const RENDER_VIEWER_ZOOM_MIN = 0.25;
/** Ограничение масштаба — максимальный zoom. */
export const RENDER_VIEWER_ZOOM_MAX = 4;

/** Нормализация azimuth в диапазон 0..(360). */
export const RENDER_VIEWER_AZIMUTH_WRAP_DEG = 360;

/** Throttle для wheel-зумирования (мс). */
export const RENDER_VIEWER_WHEEL_SEND_INTERVAL_MS = 45;

/** Шаг зума на один wheel tick (множитель). */
export const RENDER_VIEWER_WHEEL_ZOOM_FACTOR = 1.07;

/** UI: прозрачность текста "выберите модель". */
export const RENDER_VIEWER_EMPTY_STATE_OPACITY = 0.7;
/** UI: отступ сверху для текста "выберите модель" (px). */
export const RENDER_VIEWER_EMPTY_STATE_PADDING_TOP_PX = 160;
/** UI: отступ снизу у сообщения об ошибке (px). */
export const RENDER_VIEWER_ERROR_MARGIN_BOTTOM_PX = 8;

/** Для rotate-сообщений: clamp azimuth в диапазоне -360..360 (deg). */
export const RENDER_ROTATE_MESSAGE_AZIMUTH_MIN_DEG = -360;
export const RENDER_ROTATE_MESSAGE_AZIMUTH_MAX_DEG = 360;

/** Для rotate-сообщений: округление углов до 0.1 deg. */
export const RENDER_ROTATE_MESSAGE_ANGLE_ROUND_MULTIPLIER = 10;
/** Для rotate-сообщений: округление zoom до 0.001. */
export const RENDER_ROTATE_MESSAGE_ZOOM_ROUND_MULTIPLIER = 1000;

