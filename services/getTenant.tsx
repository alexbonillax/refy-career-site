export const getTenantCode = (): string => {
  if (process.env.NODE_ENV !== 'development' && !window.location.href.includes('localhost')) {
    if (window.location.href.includes('//')) {
      return window.location.href.split('//')[1].split('.')[0];
    } else {
      return window.location.href.split('.')[0];
    }
  }
  return 'refy';
}