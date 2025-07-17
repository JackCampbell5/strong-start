export function reformatServices(serviceDataGiven) {
  let serviceData = [];
  for (let service of serviceDataGiven) {
    let serviceObj = {};
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

function stringifyHours(hoursObj) {
  let formattedHours = "";
  let hours = hoursObj?.weekdayDescriptions;
  for (const hour of hours) {
    formattedHours += hour + ",   ";
  }
  formattedHours = formattedHours.slice(0, -4);
  return formattedHours;
}

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
  return formattedReviews;
}
