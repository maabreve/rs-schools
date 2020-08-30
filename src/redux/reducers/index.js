import { combineReducers } from "redux";
import schools from "./schoolsReducer";
import currentLocation from "./currentLocationReducer";
import currentSchool from "./currentSchoolReducer";
import currentRoute from "./currentRouteReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  schools,
  currentSchool,
  currentLocation,
  currentRoute,
  apiCallsInProgress
});

export default rootReducer;
