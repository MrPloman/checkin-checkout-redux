import { ActionReducerMap } from "@ngrx/store";
import { UIReducers } from "./shared/store/ui.reducer";
import { User } from "./models/user.model";
import { authReducers } from "./auth/store/auth.reducer";

export interface UIStateInterface {
  loading: boolean;
}
export interface AuthStateInterface {
  user: User;
}
export interface AppState {
  UIState: UIStateInterface;
  AuthState: AuthStateInterface;
}
export const appReducers: ActionReducerMap<AppState> = {
  UIState: UIReducers,
  AuthState: authReducers,
};
