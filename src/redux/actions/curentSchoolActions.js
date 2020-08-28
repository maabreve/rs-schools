import * as types from "./actionTypes";

export function setCurrentSchoolSuccess(currentSchool) {
  return { type: types.SET_CURRENT_SCHOOL, currentSchool };
}

export function setCurrentSchool(currentSchool) {
  return function(dispatch) {
    dispatch(setCurrentSchoolSuccess(currentSchool));
  };
}
