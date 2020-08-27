import { combineReducers } from "redux";
import schools from "./schoolsReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  schools,
  apiCallsInProgress
});

export default rootReducer;
