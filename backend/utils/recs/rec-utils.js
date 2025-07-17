export function reformatServices(serviceDataGiven) {
  let serviceData = [];
  for (let service of serviceDataGiven) {
    let serviceObj = {};
    serviceObj.name = service?.displayName?.text;
    serviceObj.address = service?.formattedAddress;
    serviceObj.zipcode = service?.postalAddress?.postalCode;
    serviceObj.description = serviceObj.email = null;
    serviceObj.phone = service?.nationalPhoneNumber;
    serviceObj.website = service?.websiteUri;
    serviceObj.hours = stringifyHours(service?.regularOpeningHours);
    serviceObj.logo = service?.iconMaskBaseUri;
    serviceObj.language = null;
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
