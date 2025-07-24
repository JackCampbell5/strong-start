export const REC_FEATURES = Object.freeze({
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
// The goal values for each param
// If it does not hit the goal value the weight of the parameter should be less than default
export const featureGoalBaselines = {
  [REC_FEATURES.EXISTING_POPULARITY]: 0.5, // If less than 50% of the services already existing are popular then rank it less
  [REC_FEATURES.RATING]: 4, // Want at least 4 stars to be a good recommendation
  [REC_FEATURES.KEYWORDS]: 20, // Want at least 20 keywords to be a good recommendation
  [REC_FEATURES.POP_SERVICE_TYPES]: 2,
  [REC_FEATURES.EXISTING]: 0.25, // If less than 25% are existing then rank it less
  [REC_FEATURES.SERVICE_NUMBER]: 2,
  [REC_FEATURES.POP_ZIPCODE]: 1, // Would be amazing if it had 1 popular zipcode
  [REC_FEATURES.POP_LANGUAGES]: 1, // Would like 1 language other than english
  [REC_FEATURES.COMPLETENESS]: 15, // Want average fields filled out to be 15
};
// The default weight for each param before dynamic weighting
export const starterWeights = {
  [REC_FEATURES.EXISTING_POPULARITY]: 0.3,
  [REC_FEATURES.RATING]: 0.15,
  [REC_FEATURES.KEYWORDS]: 0.15,
  [REC_FEATURES.POP_SERVICE_TYPES]: 0.2,
  [REC_FEATURES.EXISTING]: 0.2,
  [REC_FEATURES.SERVICE_NUMBER]: 0.5,
  [REC_FEATURES.POP_ZIPCODE]: 0.2,
  [REC_FEATURES.POP_LANGUAGES]: 0.4,
  [REC_FEATURES.COMPLETENESS]: 0.1,
};

/**The default formula for each param with dynamic weights and max
 * Each object will be in the form of {weight: 0.5, max: 1}
 * Overall formula Left * Right = Final Weight
 *     Left/Right calculated from the individual params in the form ((paramValue/max)*weight + (paramValue/max)*weight)
 * More info on the alg https://docs.google.com/document/d/1hU_jAHVHUc9K7xqLxh4dRtvjB1Ym6WfL6J6gGTP-HHc/edit?tab=t.4va8vbanzgco#heading=h.w27nbpgapq70
 */
export const dynamicWeightsAndFormulaDefault = {
  left: {
    [REC_FEATURES.EXISTING_POPULARITY]: {},
    [REC_FEATURES.RATING]: {},
    [REC_FEATURES.KEYWORDS]: {},
    [REC_FEATURES.POP_SERVICE_TYPES]: {},
    [REC_FEATURES.EXISTING]: {},
  },
  right: {
    [REC_FEATURES.SERVICE_NUMBER]: {},
    [REC_FEATURES.POP_ZIPCODE]: {},
    [REC_FEATURES.POP_LANGUAGES]: {},
    [REC_FEATURES.COMPLETENESS]: {},
  },
}; // dynamicWeightsAndFormulaDefault
