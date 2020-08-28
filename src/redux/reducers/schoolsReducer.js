import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function schoolsReducer(state = initialState.schools, action) {
  switch (action.type) {
    case types.LOAD_SCHOOLS_SUCCESS:
      return [...state,  ...action.schools ];
    default:
      return state;
  }
}
