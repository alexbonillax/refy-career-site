export const BeautifyUrl = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '').trim();
}