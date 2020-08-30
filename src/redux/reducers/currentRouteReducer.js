import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentRoute(state = initialState.currentRoute, action) {
  switch (action.type) {
    case types.SET_CURRENT_ROUTE:
      return action.currentRoute;
    default:
      return state;
  }
}
