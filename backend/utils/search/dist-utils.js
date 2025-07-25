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
 * Helper function so you can pass cord directly as an object
 * @param {object} encodedPoint - The object of the point, in the form {latitude: number, longitude: number}
 * @param {number} radius - The distance in miles to add to the point
 * @returns The calculated rectangle in the form {low: {latitude, longitude}, high: {latitude, longitude}}
 */
export function getRadiusAroundPointObject(encodedPoint, radius) {
  return getAreaAroundPoint(
    encodedPoint.latitude,
    encodedPoint.longitude,
    radius
  );
}

/**
 * Adds a certain number of miles to a point's latitude and longitude to make a rectangle around the point
 * @param {number} lat - The latitude of the point
 * @param {number} long - The longitude of the point
 * @param {number} radius - The distance in miles to add to the point
 * @returns The calculated rectangle in the form {low: {latitude, longitude}, high: {latitude, longitude}}
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

/**
 * Calculates the distance between two points in miles using the Haversine formula
 * Formula for calculation: https://www.movable-type.co.uk/scripts/latlong.html
 * @param {object} cords1 - The first point in the form {latitude: number, longitude: number}
 * @param {object} cords2 - The second point in the form {latitude: number, longitude: number}
 * @returns The distance between the two points in miles
 */
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

/**
 * Get the coordinates from a location object in a object with latitude and longitude keys
 * @param {object} locationObj - The location object from the google maps api
 * @returns The longitude and latitude of the location object in the form {longitude: number, latitude: number}
 */
export function getCords(locationObj) {
  let cords = locationObj.location;
  let long = cords.longitude;
  let lat = cords.latitude;
  return { longitude: long, latitude: lat };
}

/**
 * Checks 2 Perimeter's overlap with each other
 * + Both params in the form {low: {latitude, longitude}, high: {latitude, longitude}}
 * @param {object} mainRange - Cords of the main nonprofit to check against
 * @param {object} checkRange - Location object to check against
 * @returns True if the 2 Perimeter's overlap, false if they do not
 */
export function perimeterOverlap(mainRange, checkRange) {
  let mainRangeLat = {
    low: mainRange.low.latitude,
    high: mainRange.high.latitude,
  };
  let mainRangeLong = {
    low: mainRange.low.longitude,
    high: mainRange.high.longitude,
  };
  let checkRangeLat = {
    low: checkRange.low.latitude,
    high: checkRange.high.latitude,
  };
  let checkRangeLong = {
    low: checkRange.low.longitude,
    high: checkRange.high.longitude,
  };
  return (
    oneDimensionalHasOverlap(mainRangeLat, checkRangeLat) &&
    oneDimensionalHasOverlap(mainRangeLong, checkRangeLong)
  );
}

/**
 * Checks if the 2 Perimeter's overlap with each other in one dimension
 * + Both params in the form {low: number, high: number}
 * @param {object} mainRange - Cords of the main nonprofit to check against
 * @param {object} checkRange - Other perimeter to check against
 * @returns True if the 2 Perimeter's overlap, false if they do not
 */
export function oneDimensionalHasOverlap(mainRange, checkRange) {
  return (
    (checkRange.low >= mainRange.low && checkRange.low <= mainRange.high) ||
    (checkRange.high <= mainRange.high && checkRange.high >= mainRange.low)
  );
}

/**
 * Checks if a service is in the Perimeter
 * @param {object} range - The range to check if the service is in, in the form of {low: {latitude, longitude}, high: {latitude, longitude}}
 * @param {object} service - The service to check if it is in the Perimeter
 * @returns true if the service is in the Perimeter, false if it is not
 */
export function serviceInPerimeter(range, loc) {
  return (
    loc.latitude >= range.low.latitude &&
    loc.latitude <= range.high.latitude &&
    loc.longitude >= range.low.longitude &&
    loc.longitude <= range.high.longitude
  );
}
