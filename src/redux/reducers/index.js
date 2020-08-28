import { combineReducers } from "redux";
import schools from "./schoolsReducer";
import currentLocation from "./currentLocationReducer";
import currentSchool from "./currentSchoolReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  schools,
  currentSchool,
  currentLocation,
  apiCallsInProgress
});

export default rootReducer;
