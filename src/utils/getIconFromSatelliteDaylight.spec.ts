import { BsMoon, BsSun } from 'react-icons/bs';

import { getIsInDaylight } from './getIsInDaylight';

describe('getIconFromSatelliteDaylight', () => {
  const defaultSatelliteInfo = {
    name: 'iss',
    latitude: 20,
    longitude: 20,
  };

  test('with visibility === daylight', () => {
    // GIVEN
    const satelliteInfo = { ...defaultSatelliteInfo, visibility: 'daylight' };

    // WHEN
    const isInDaylight = getIsInDaylight(satelliteInfo)
      ? BsSun
      : getIsInDaylight(satelliteInfo) === null
      ? null
      : BsMoon;

    // THEN
    expect(isInDaylight).toBe(BsSun);
  });

  test('with visibility === eclipsed', () => {
    // GIVEN
    const satelliteInfo = { ...defaultSatelliteInfo, visibility: 'eclipsed' };

    // WHEN
    const isInDaylight = getIsInDaylight(satelliteInfo)
      ? BsSun
      : getIsInDaylight(satelliteInfo) === null
      ? null
      : BsMoon;

    // THEN
    expect(isInDaylight).toBe(BsMoon);
  });

  test('with no visibility field', () => {
    // GIVEN
    const satelliteInfo = defaultSatelliteInfo;

    // WHEN
    const isInDaylight = getIsInDaylight(satelliteInfo)
      ? BsSun
      : getIsInDaylight(satelliteInfo) === null
      ? null
      : BsMoon;

    // THEN
    expect(isInDaylight).toBe(null);
  });
});
