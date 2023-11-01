import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/Index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
