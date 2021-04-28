import { converKilometersByHourToMetersBySecond } from './convertKilometersByHourToMetersBySecond';

describe('converKilometersByHourToMetersBySecond function', () => {
  test('with velocity === 100', () => {
    // GIVEN
    const velocity = 100;

    // WHEN
    const velocityInMeterBySecond = converKilometersByHourToMetersBySecond(
      velocity
    );

    // THEN
    expect(velocityInMeterBySecond.toFixed(4)).toBe((100 / 3.6).toFixed(4));
  });

  test('with velocity === 76', () => {
    // GIVEN
    const velocity = 76;

    // WHEN
    const velocityInMeterBySecond = converKilometersByHourToMetersBySecond(
      velocity
    );

    // THEN
    expect(velocityInMeterBySecond.toFixed(4)).toBe((76 / 3.6).toFixed(4));
  });

  test('with velocity === 0', () => {
    // GIVEN
    const velocity = 0;

    // WHEN
    const velocityInMeterBySecond = converKilometersByHourToMetersBySecond(
      velocity
    );

    // THEN
    expect(velocityInMeterBySecond).toBe(0);
  });
});
