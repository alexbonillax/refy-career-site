import dayjs from "dayjs";

export const DateToTimeLeftReduced = (date: Date): string  => {
  let diff = Math.abs((dayjs(date).diff(new Date(), 'minute')));
  if (diff < 60) {
    return `${diff} m`;
  } else {
    diff = Math.floor(diff / 60);

    if (diff < 24) {
      return `${diff} h`;
    } else {
      diff = Math.floor(diff / 24);
      return `${diff} d`;
    }
  }
}