import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentLocation(state = initialState.currentLocation, action) {
  switch (action.type) {
    case types.SET_CURRENT_LOCATION:
      return action.currentLocation;
    default:
      return state;
  }
}
