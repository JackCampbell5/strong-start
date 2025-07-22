export const REC_NAMES = Object.freeze({
  EXISTING_POPULARITY: "existing_popularity",
  RATING: "rating",
  KEYWORDS: "keywords",
  SERVICE_NUMBER: "service_number",
  POP_ZIPCODE: "pop_zipcode",
  POP_SERVICE_TYPES: "pop_service_types",
  POP_LANGUAGES: "pop_languages",
  COMPLETENESS: "completeness",
  EXISTING: "existing",
});
// If it does not hit the goal value it should not be weighted as much
export const goalValues = {
  [REC_NAMES.EXISTING_POPULARITY]: 0.5, // If less than 50% of the services already existing are popular then rank it less
  [REC_NAMES.RATING]: 4, // Want at least 4 stars to be a good recommendation
  [REC_NAMES.KEYWORDS]: 20, // Want at least 20 keywords to be a good recommendation
  [REC_NAMES.POP_SERVICE_TYPES]: 2,
  [REC_NAMES.EXISTING]: 0.25, // If less than 25% are existing then rank it less
  [REC_NAMES.SERVICE_NUMBER]: 2,
  [REC_NAMES.POP_ZIPCODE]: 1, // Would be amazing if it had 1 popular zipcode
  [REC_NAMES.POP_LANGUAGES]: 1, // Would like 1 language other than english
  [REC_NAMES.COMPLETENESS]: 15, // Want average fields filled out to be 15
};
export const weights = {
  [REC_NAMES.EXISTING_POPULARITY]: 0.3,
  [REC_NAMES.RATING]: 0.15,
  [REC_NAMES.KEYWORDS]: 0.15,
  [REC_NAMES.POP_SERVICE_TYPES]: 0.2,
  [REC_NAMES.EXISTING]: 0.2,
  [REC_NAMES.SERVICE_NUMBER]: 0.5,
  [REC_NAMES.POP_ZIPCODE]: 0.2,
  [REC_NAMES.POP_LANGUAGES]: 0.4,
  [REC_NAMES.COMPLETENESS]: 0.1,
};

export const calcResults = {
  left: {
    [REC_NAMES.EXISTING_POPULARITY]: {},
    [REC_NAMES.RATING]: {},
    [REC_NAMES.KEYWORDS]: {},
    [REC_NAMES.POP_SERVICE_TYPES]: {},
    [REC_NAMES.EXISTING]: {},
  },
  right: {
    [REC_NAMES.SERVICE_NUMBER]: {},
    [REC_NAMES.POP_ZIPCODE]: {},
    [REC_NAMES.POP_LANGUAGES]: {},
    [REC_NAMES.COMPLETENESS]: {},
  },
};
