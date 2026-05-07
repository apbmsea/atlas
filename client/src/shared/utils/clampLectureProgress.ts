/**
 * Нормализует прогресс лекции, который приходит с backend.
 * - `null/undefined/NaN` -> `null`
 * - иначе: округление до целого и clamp в диапазон 0..100
 */
export const clampLectureProgress = (n: number | null | undefined): number | null => {
	if (n == null || Number.isNaN(n)) return null;
	return Math.max(0, Math.min(100, Math.round(n)));
};

