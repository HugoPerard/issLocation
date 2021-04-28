import dayjs from 'dayjs';

import { convertTimestampToDate } from './convertTimestampToDate';

describe('convertTimestampToDate function', () => {
  test('with timestamp === 0', () => {
    // GIVEN
    const timestamp = 0;

    // WHEN
    const date = convertTimestampToDate(timestamp).format(
      'DD/MM/YYYY - HH:mm:ss'
    );

    // THEN
    expect(date).toBe('01/01/1970 - 01:00:00');
  });

  test('with timestamp corresponding to 28/04/2021 at 12h15m20s', () => {
    // GIVEN
    const timestamp = 1619612120;

    // WHEN
    const date = convertTimestampToDate(timestamp).format(
      'DD/MM/YYYY - HH:mm:ss'
    );

    // THEN
    expect(date).toBe('28/04/2021 - 14:15:20');
  });

  test('with now timestamp', () => {
    // GIVEN
    const timestamp = dayjs().unix();

    // WHEN
    const date = convertTimestampToDate(timestamp).format(
      'DD/MM/YYYY - HH:mm:ss'
    );

    // THEN
    expect(date).toBe(dayjs().format('DD/MM/YYYY - HH:mm:ss'));
  });
});
