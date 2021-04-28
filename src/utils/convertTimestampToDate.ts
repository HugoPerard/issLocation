import dayjs, { Dayjs } from 'dayjs';

export const convertTimestampToDate = (timestamp: number): Dayjs => {
  return dayjs.unix(timestamp);
};
