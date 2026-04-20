import type { HandledError } from "@shared/types/handledError";


export function isHandledError(error: unknown): error is HandledError {
	if (typeof error !== 'object' || error === null) {
		return false;
	}

	const isHandled = error as Partial<HandledError>;

	if (typeof isHandled.status !== 'number') return false;
	if (typeof isHandled.data !== 'object' || isHandled.data === null) return false;
	if (typeof isHandled.data.message !== 'string') return false;

	return true;
}

/**
 * Преобразует неизвестную ошибку к человекочитаемой строке.
 * @param e - любая ошибка
 * @returns строка с сообщением об ошибке
 */
export const toError = (e: unknown): string =>
	e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e);