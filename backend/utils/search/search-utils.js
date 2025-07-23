// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

// Local Imports
import { extractZipcode } from "#search/address-utils.js";

const prisma = new PrismaClient();

/**
 * Creates a search log for the given search parameters
 * @param {object} params - The search parameters
 * @param {*} nonprofit - The nonprofit that was searched for
 * @param {*} len - The length of the search results
 * @param {*} session - The session object for this user
 */
export async function createSearchLog(params, nonprofit, len, session) {
  const searchQuery = {
    zipcode: extractZipcode(params.address.formattedAddress),
    services_needed: params.services,
    languages: params.language,
    date_needed: params.date_needed
      ? new Date(params.date_entered).toISOString()
      : "",
    results_found: len,
  };
  await prisma.web_log.create({
    data: {
      session_token: session.sessionUUID,
      user_type: 0, // TODO - get user type when more logging is added
      page_id: "search",
      action: "searchServices",
      nonprofit: {
        connect: { id: nonprofit.id },
      },
      search_log: {
        create: searchQuery,
      },
    },
  });
}
