/**
 * Updates the value of a data array at a given index of a given key with a given value
 * @param {object} data - The data to be updated
 * @param {Function} dataUpdate - The function used to update the data
 * @param {number} index - The index of the data to be updated
 * @param {any} value - The value to be updated to
 * @param {string} key - The key of the data to be updated
 * @returns Nothing - The function updates the data in place
 */
export function setValueCreator(data, dataUpdate) {
  return (index, value, key = "value") => {
    const updatedData = [...data];
    updatedData[index][key] = value;
    dataUpdate(updatedData);
  };
}
