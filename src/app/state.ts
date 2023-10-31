import { ActionReducerMap } from "@ngrx/store";
import { UIReducers } from "./shared/store/ui.reducer";
import { User } from "./models/user.model";
import { authReducers } from "./auth/store/auth.reducer";
import { IncomeOutcome } from "./models/income-outcome.model";
import { IncomeOutcomesReducers } from "./ingreso-egreso/store/income-outcome.reducers";

export interface UIStateInterface {
  loading: boolean;
}
export interface AuthStateInterface {
  user: User;
}
export interface AppState {
  UIState: UIStateInterface;
  AuthState: AuthStateInterface;
  IncomeOutcomeState: IncomeOutcome[];
}
export interface AppStateWithIncomeOutcome extends AppState {
  IncomeOutcome: IncomeOutcome;
}
export const appReducers: ActionReducerMap<AppState> = {
  UIState: UIReducers,
  AuthState: authReducers,
  IncomeOutcomeState: IncomeOutcomesReducers,
};
