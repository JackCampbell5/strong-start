/**
 * Makes sure the data that was sent back includes the:
 * + Icon
 * + Default value
 * + Name
 * + Required status
 *
 * @param {object} data - The data that was sent back from the server
 * @param {object} defaultData - The local default data to check against
 * @returns The complete data with the default values if needed
 */
export function fillMissingDataFields(data, defaultData) {
  // Make sure the data that was sent back includes the icon and default values
  let completeData = [];
  for (const a of data) {
    const key = a.id;
    if (defaultData[key]) {
      if (!a.default) {
        a.default = defaultData[key].default;
      }
      if (!a.icon) {
        a.icon = defaultData[key].icon;
      }
      if (!a.name) {
        a.name = defaultData[key].name;
      }
      if (!a.required) {
        a.required = defaultData[key].required;
      }
    }
    completeData.push(a);
  }
  return completeData;
}
