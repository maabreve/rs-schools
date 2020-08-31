import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + "/schools/";

export const getSchools = async () => {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
