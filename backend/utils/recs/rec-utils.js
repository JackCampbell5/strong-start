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
    serviceObj.language = [
      convertLanguageCode(service?.displayName?.languageCode),
    ];
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
  // Check if obj is valid
  if (!hoursObj) return null;

  const hours = hoursObj?.weekdayDescriptions; // Get the hours array

  // Loop through hours and add them to a string
  let formattedHours = "";
  for (const hour of hours) {
    formattedHours += hour + ",   ";
  }

  // Remove the last comma and space
  formattedHours = formattedHours.slice(0, -4);
  return formattedHours;
}

/**
 * Takes a 2 digit language code and converts it to the whole word
 * @param {String} languageCode - The language code from the google API response
 * @returns The whole word of that language
 */
function convertLanguageCode(languageCode) {
  // Check if languageCode is valid
  if (!languageCode) return null;

  // Convert language code to whole word
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
  // Check if reviewDataGiven is valid
  if (!reviewDataGiven) return null;
  /**
   * Helper function that checks if the text is valid and returns the text if it is, otherwise returns an empty string
   * @param {string} text - The text to check if valid
   * @returns The string if valid, otherwise an empty string
   */
  function getText(text) {
    return text || "";
  }

  // Loop through reviews and add them to a string
  let formattedReviews = [];
  let totalChars = 0;
  for (let review of reviewDataGiven) {
    const authorName = getText(review?.authorAttribution?.displayName);
    const rating = getText(review?.rating);
    const reviewText = getText(review?.text?.text);
    totalChars += reviewText.length;
    formattedReviews.push(`${authorName}(${rating} Stars): ${reviewText}`);
    if (totalChars > 600) break; // Break if the string is longer than 600 characters (to avoid crazy
  }
  return formattedReviews.join("\n\n");
}
