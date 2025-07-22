// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

const prisma = new PrismaClient();

export async function getCurrentlyPopularInfo(nonprofit) {
  let popular = {};
  // Get popular services
  popular["id"] = await getCurrentPopularServices(nonprofit);

  // Get more popular info from the search logs
  let searchLog = await prisma.web_log.findMany({
    where: {
      NOT: { search_log: null }, // Filter out logs that don't have a search log
      nonprofit_ID: nonprofit.id,
      action: "search",
    },
    include: {
      search_log: true,
    },
  });

  popular["zipcode"] = await getPopularOfType(searchLog, "zipcode");
  popular["services_needed"] = await getPopularOfType(
    searchLog,
    "services_needed"
  );
  popular["languages"] = await getPopularOfType(searchLog, "languages");
  popular["date_needed"] = await getPopularOfType(searchLog, "date_needed");
  return popular;
}

async function getPopularOfType(logs, type) {
  let typeList = logs.flatMap((log) => {
    if (log.search_log) return log.search_log[type];
  });
  return getPopularInOrder(typeList);
}

async function getCurrentPopularServices(nonprofit) {
  // Get all serves
  let webLog = await prisma.web_log.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
      action: "moreDetails",
    },
    include: {
      service: true,
    },
  });
  const popServices = webLog.map((log) => {
    if (log.service) return log.service.id;
  });

  return getPopularInOrder(popServices);
}

function getPopularInOrder(list) {
  let popular = {};
  list.forEach((service) => {
    if (service in popular) {
      popular[service] += 1;
    } else {
      popular[service] = 1;
    }
  });
  return popular;
}
