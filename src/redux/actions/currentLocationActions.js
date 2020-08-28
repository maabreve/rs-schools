import * as types from "./actionTypes";

export function setCurrentLocationSuccess(currentLocation) {
  return { type: types.SET_CURRENT_LOCATION, currentLocation };
}

export function setCurrentLocation(currentLocation) {
  return function(dispatch) {
    dispatch(setCurrentLocationSuccess(currentLocation));
  };
}
