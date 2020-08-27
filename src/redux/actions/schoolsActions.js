import * as types from "./actionTypes";
import * as schoolsApi from "../../api/schoolsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSchoolsSuccess(schools) {
  return { type: types.LOAD_SCHOOLS_SUCCESS, schools };
}

export function loadSchools() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return schoolsApi
      .getSchools()
      .then(schools => {
        dispatch(loadSchoolsSuccess(schools));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
