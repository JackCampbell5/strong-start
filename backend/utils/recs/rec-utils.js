/**
 * Takes the services objects from googles API and reformats them into a format that can be used by the frontend
 * @param {Array} serviceDataGiven - An array of services objects from googles API response
 * @returns The reformatted service data as an Array
 */
export function reformatServices(serviceDataGiven) {
  let serviceData = [];
  for (let service of serviceDataGiven) {
    let serviceObj = {};
    serviceObj.id = service?.id;
    serviceObj.name = service?.displayName?.text;
    serviceObj.address = service?.formattedAddress;
    serviceObj.zipcode = service?.postalAddress?.postalCode;
    serviceObj.description = reformatReviews(service?.reviews);
    serviceObj.email = null;
    serviceObj.phone = service?.nationalPhoneNumber;
    serviceObj.website = service?.websiteUri;
    serviceObj.hours = stringifyHours(service?.regularOpeningHours);
    serviceObj.logo = service?.iconMaskBaseUri + ".svg"; // Links come without a tag
    serviceObj.language = convertLanguageCode(
      service?.displayName?.languageCode
    );
    serviceObj.date_needed = null;
    serviceObj.services_offered = null;
    serviceObj.restrictions = null;
    serviceObj.next_steps = service?.nextSteps;
    serviceObj = Object.fromEntries(
      Object.entries(serviceObj).filter(([_, value]) => value != null)
    );
    serviceData.push(serviceObj);
  }
  return serviceData;
}

/**
 * Takes the hours object from the google API response and reformats it into a string that can be used by the frontend
 * @param {object} hoursObj - The hours object from the google API response
 * @returns The reformatted hours as a string
 */
function stringifyHours(hoursObj) {
  if (!hoursObj) return null;
  let formattedHours = "";
  let hours = hoursObj?.weekdayDescriptions;
  for (const hour of hours) {
    formattedHours += hour + ",   ";
  }
  formattedHours = formattedHours.slice(0, -4);
  return formattedHours;
}

/**
 * Takes a 2 digit language code and converts it to the whole word
 * @param {String} languageCode - The language code from the google API response
 * @returns The whole word of that language
 */
function convertLanguageCode(languageCode) {
  if (!languageCode) return null;
  switch (languageCode) {
    case "en":
      return "English";
    case "es":
      return "Spanish";
    case "fr":
      return "French";
    case "ps":
      return "Pashto";
    case "ar":
      return "Arabic";
    case "ur":
      return "Urdu";
    case "hi":
      return "Hindi";
    case "bn":
      return "Bengali";
    case "fa":
      return "Farsi";
    default:
      return null;
  }
}

/**
 * Takes the reviews object from the google API response and reformats it into a string that can be used by the frontend
 * @param {object} reviewDataGiven - The review data from the google API response
 * @returns The reformatted reviews as a string
 */
function reformatReviews(reviewDataGiven) {
  if (!reviewDataGiven) return null;
  function getText(text) {
    return text ? text : "";
  }
  let formattedReviews = "";
  for (let review of reviewDataGiven) {
    formattedReviews += `${getText(
      review?.authorAttribution?.displayName
    )}(${getText(review?.rating)} Stars): ${getText(review?.text?.text)}\n\n`;
  }
  return formattedReviews.slice(0, 600);
}
