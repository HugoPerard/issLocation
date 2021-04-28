import { getIsInDaylight } from './getIsInDaylight';

describe('getIsInDaylight function', () => {
  const defaultSatelliteInfo = {
    name: 'iss',
    latitude: 20,
    longitude: 20,
  };

  test('with visibility === daylight', () => {
    // GIVEN
    const satelliteInfo = { ...defaultSatelliteInfo, visibility: 'daylight' };

    // WHEN
    const isInDaylight = getIsInDaylight(satelliteInfo);

    // THEN
    expect(isInDaylight).toBe(true);
  });

  test('with visibility === eclipsed', () => {
    // GIVEN
    const satelliteInfo = { ...defaultSatelliteInfo, visibility: 'eclipsed' };

    // WHEN
    const isInDaylight = getIsInDaylight(satelliteInfo);

    // THEN
    expect(isInDaylight).toBe(false);
  });

  test('with no visibility field', () => {
    // GIVEN
    const satelliteInfo = defaultSatelliteInfo;

    // WHEN
    const isInDaylight = getIsInDaylight(satelliteInfo);

    // THEN
    expect(isInDaylight).toBe(null);
  });
});
