import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentSchool(state = initialState.currentSchool, action) {
  switch (action.type) {
    case types.SET_CURRENT_SCHOOL:
      return  action.currentSchool;
    default:
      return state;
  }
}
