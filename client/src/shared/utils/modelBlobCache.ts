/**
 * Кэш blob-URL для моделей (ключ — objectKey из хранилища).
 * Хранит созданные URL, позволяет безопасно отзывать.
 */
export const modelBlobCache = (() => {
  const map = new Map<string, string>();

  /**
   * Возвращает blob-URL по ключу, если он закэширован.
   * @param key - objectKey модели
   */
  const get = (key: string): string | undefined => map.get(key);

  /**
   * Сохраняет blob-URL в кэш.
   * @param key - objectKey модели
   * @param url - blob-URL
   */
  const set = (key: string, url: string): void => { map.set(key, url); };

  /**
   * Отзывает и удаляет blob-URL по ключу, если он есть.
   * @param key - objectKey модели
   * @returns true, если был удалён
   */
  const revokeAndDelete = (key: string): boolean => {
    const url = map.get(key);
    if (!url) return false;
    if (url.startsWith('blob:')) {
      try { URL.revokeObjectURL(url); } catch { /* ignore */ }
    }
    return map.delete(key);
  };

  /**
   * Полностью очищает кэш и отзывает все blob-URL.
   */
  const clearAll = (): void => {
    for (const [, url] of map) {
      if (url.startsWith('blob:')) {
        try { URL.revokeObjectURL(url); } catch { /* ignore */ }
      }
    }
    map.clear();
  };

  return { get, set, revokeAndDelete, clearAll } as const;
})();