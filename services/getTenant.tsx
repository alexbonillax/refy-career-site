export const getTenantCode = (url: string): string => {
  if (process.env.NODE_ENV !== 'development' && url && url.includes('refy.careers') && !url.includes('localhost')) {
    if (url.includes('//')) {
      return url.split('//')[1].split('.')[0];
    } else {
      return url.split('.')[0];
    }
  }
  return 'tropicfeel';
}