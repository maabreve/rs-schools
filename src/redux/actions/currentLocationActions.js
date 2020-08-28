import * as types from "./actionTypes";

export function setLocationSuccess(currentLocation) {
  return { type: types.SET_CURRENT_LOCATION, currentLocation };
}

export function setLocation(currentLocation) {
  return function(dispatch) {
    dispatch(setLocationSuccess(currentLocation));
  };
}
