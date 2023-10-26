import { createSelector } from "@ngrx/store";
import { AppState, UIStateInterface } from "src/app/state";

export const selectUI = (state: AppState) => state.UIState;

export const selectUILoading = createSelector(
  selectUI,
  (state: UIStateInterface) => state.loading
);
