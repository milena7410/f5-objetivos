import { combineReducers } from "@reduxjs/toolkit";

import { todoReducer } from "./todos/reducer";

export const rootReducer = combineReducers({
  todos: todoReducer,
});
