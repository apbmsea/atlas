/** Безопасный revoke для blob-URL. */
export const revokeBlob = (url?: string | null) => {
  if (url && url.startsWith('blob:')) { try { URL.revokeObjectURL(url); } catch { /* empty */ } }
};