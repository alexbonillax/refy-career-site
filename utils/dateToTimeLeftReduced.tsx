import dayjs from "dayjs";

export const DateToTimeLeftReduced = (date: Date): string  => {
  const moment = require('moment-timezone')
  const e = new Date().getTimezoneOffset;
  const toTimezoneDate = moment(date + 'Z').utcOffset(e).toDate();
  let diff = Math.abs((dayjs(toTimezoneDate).diff(new Date(), 'minute')));
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