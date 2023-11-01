import { combineReducers } from "redux";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  authReducer,
  taskReducer,
});
