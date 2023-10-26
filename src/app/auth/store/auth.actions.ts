import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";
export const setUser = createAction("[Set User]", props<{ user: User }>());
export const removeUser = createAction("[Remove User]");
