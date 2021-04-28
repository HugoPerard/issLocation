export const converKilometersByHourToMetersBySecond = (
  velocity: number
): number => {
  if (velocity === 0) {
    return 0;
  }
  return velocity / 3.6;
};
