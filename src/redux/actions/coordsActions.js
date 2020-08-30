import * as types from "./actionTypes";

export function setCoordsSuccess(coords) {
  return { type: types.SET_COORDS, coords };
}

export function setCoords(coords) {
  return function(dispatch) {
    dispatch(setCoords(coords));
  };
}
