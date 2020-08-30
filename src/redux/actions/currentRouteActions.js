import * as types from "./actionTypes";

export function setCurrentRouteSuccess(currentRoute) {
  return { type: types.SET_CURRENT_ROUTE, currentRoute };
}

export function setCurrentRoute(currentRoute) {
  return function(dispatch) {
    dispatch(setCurrentRouteSuccess(currentRoute));
  };
}
