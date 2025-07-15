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
  for (const field of data) {
    const key = field.id;
    if (defaultData[key]) {
      if (!field.default) {
        field.default = defaultData[key].default;
      }
      if (!field.icon) {
        field.icon = defaultData[key].icon;
      }
      if (!field.name) {
        field.name = defaultData[key].name;
      }
      if (!field.required) {
        field.required = defaultData[key].required;
      }
      if (!a.tooltip && defaultData[key].tooltip) {
        a.tooltip = defaultData[key].tooltip;
      }
    }
    completeData.push(field);
  }
  return completeData;
}
