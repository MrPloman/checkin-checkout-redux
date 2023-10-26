import { createReducer, on } from "@ngrx/store";
import { removeUser, setUser } from "./auth.actions";
import { AuthStateInterface } from "src/app/state";
import { User } from "src/app/models/user.model";
export const initialAuthState: AuthStateInterface = {
  user: undefined,
};
export const authReducers = createReducer(
  initialAuthState,
  on(
    setUser,
    (state, { user }) =>
      (state = {
        user: user,
      })
  ),
  on(removeUser, (state) => (state = { user: undefined }))
);
