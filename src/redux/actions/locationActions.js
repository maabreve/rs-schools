import * as types from "./actionTypes";

export function setLocationSuccess(location) {
  return { type: types.SET_LOCATION, location };
}

export function setLocation(location) {
  return function(dispatch) {
      dispatch(setLocationSuccess(location));
  };
}
