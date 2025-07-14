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

export function calcDistance(cords1, cords2) {
  const earthRadiusMiles = 3958.76145808; // Approximate Earth radius in miles
  const degreesToRadians = Math.PI / 180;
  const lat1 = cords1.latitude;
  const lon1 = cords1.longitude;
  const lat2 = cords2.latitude;
  const lon2 = cords2.longitude;

  let dlat = (lat2 - lat1) * degreesToRadians;
  let dlon = (lon2 - lon1) * degreesToRadians;

  let lat1r = lat1 * degreesToRadians;
  let lat2r = lat2 * degreesToRadians;

  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.pow(Math.sin(dlon / 2), 2) * (Math.cos(lat1r) * Math.cos(lat2r));
  let c = 2 * Math.asin(Math.sqrt(a));
  return earthRadiusMiles * c;
}

export function getCords(locationObj) {
  let cords = locationObj.location;
  let long = cords.longitude;
  let lat = cords.latitude;
  return { longitude: long, latitude: lat };
}
