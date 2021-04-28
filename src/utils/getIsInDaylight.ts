export const getIsInDaylight = (satelliteInfo) => {
  if (!satelliteInfo?.visibility) {
    return null;
  }
  return satelliteInfo?.visibility === 'daylight';
};
