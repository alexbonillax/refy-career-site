export const getTenantCode = (): string => {
  if (process.env.NODE_ENV !== 'development' && typeof window !== "undefined" && !window.location.href.includes('localhost')) {
    return window.location.protocol + "//" + window.location.host;
  }
  return 'refy';
}