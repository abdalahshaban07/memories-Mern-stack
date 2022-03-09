import { combineReducers } from "redux";

import posts from "./posts";
import authReducer from "./auth";
import theme from "./theme";

export const reducers = combineReducers({ posts, authReducer, theme });
