/**
 * Normalize the ranking of services to a percentage value based on the max ranking
 * @param {Array} services - An array containing the services to be normalized.
 * @returns The normalized services array.
 */
export function normalizeServiceFromRank(services) {
  const normalizedServices = JSON.parse(JSON.stringify(services));
  const maxRank = Math.max(...services.map((service) => service.ranking));
  normalizedServices.forEach((service) => {
    let normalized = service.ranking / maxRank;
    service.ranking = (normalized * 100).toFixed(0);
  });
  return normalizedServices;
}
