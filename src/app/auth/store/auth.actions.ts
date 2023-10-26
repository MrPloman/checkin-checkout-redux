import { createAction, props } from "@ngrx/store";
export const setUser = createAction(
  "[Set User]",
  props<{ name; email; uid }>()
);
export const removeUser = createAction("[Remove User]");
