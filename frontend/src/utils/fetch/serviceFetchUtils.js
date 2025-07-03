import { getNonProfit } from "#utils/pathUtils";
import { serviceInputDefaultData } from "#default-data/serviceDefaultData";
const serviceLink = import.meta.env.VITE_BACKEND_API + "/service";

export async function fetchServiceDetails(after) {
  let nonProfit = getNonProfit();
  after(serviceInputDefaultData);
  //   // TODO will uncomment once frontend connects to backend
  // await fetch(`${serviceLink}/${nonProfit}/${id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update the component with the data
  //       after(data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching given service:", error);
  //     });
}

export async function postService(info, after) {
  let nonProfit = getNonProfit();
  after(true);
  //   // TODO will uncomment once frontend connects to backend
  //   await fetch(`${serviceLink}/${nonProfit}/add`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(info),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update now that success
  //       after("");
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching boards:", error);
  //       // Return more info on the error
  //       after();
  //     });
}

export async function putService(info, after) {
  let nonProfit = getNonProfit();
  after(true);
  //   // TODO will uncomment once frontend connects to backend
  //   await fetch(`${serviceLink}/${nonProfit}/add`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(info),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update now that success
  //       after("");
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching boards:", error);
  //       // Return more info on the error
  //       after();
  //     });
}
