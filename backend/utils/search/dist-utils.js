/**
 * Adds a certain number of miles to a point's longitude
 * @param {number} lat - The latitude of the point
 * @param {number} long - The longitude of the point
 * @param {number} miles - The distance in miles to add to the point
 * @returns The calculated longitude
 */
export function addMilesToLong(lat, long, miles) {
  const earthRadiusMiles = 3958.8; // Approximate Earth radius in miles
  const degreesToRadians = Math.PI / 180;
  const radiansToDegrees = 180 / Math.PI;

  const currLatRadians = lat * degreesToRadians;
  const deLat = miles / (earthRadiusMiles * Math.cos(currLatRadians));
  const deltaLongDeg = deLat * radiansToDegrees;

  let newLong = long + deltaLongDeg;
  if (newLong > 180) {
    newLong -= 360;
  } else if (newLong < -180) {
    newLong += 360;
  }
  return newLong;
}

/**
 * Adds a certain number of miles to a point's latitude
 * @param {number} lat - The latitude of the point
 * @param {number} long - The longitude of the point
 * @param {number} miles - The distance in miles to add to the point
 * @returns The calculated latitude
 */
export function addMilesToLat(lat, long, miles) {
  const earthRadiusMiles = 3958.8; // Approximate Earth radius in miles
  const radiansToDegrees = 180 / Math.PI;

  const currLat = miles / earthRadiusMiles;
  const newLat = lat + currLat * radiansToDegrees;
  return newLat;
}

/**
 * Adds a certain number of miles to a point's latitude and longitude to make a rectangle around the point
 * @param {number} lat - The latitude of the point
 * @param {number} long - The longitude of the point
 * @param {number} radius - The distance in miles to add to the point
 * @returns
 */
export function getAreaAroundPoint(lat, long, radius) {
  return {
    low: {
      latitude: addMilesToLat(lat, long, -radius),
      longitude: addMilesToLong(lat, long, -radius),
    },
    high: {
      latitude: addMilesToLat(lat, long, radius),
      longitude: addMilesToLong(lat, long, radius),
    },
  };
}
