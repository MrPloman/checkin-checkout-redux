import { createReducer, on } from "@ngrx/store";
import { UIStateInterface } from "src/app/state";
import { setLoading } from "./ui.actions";

export const initialUIState: UIStateInterface = { loading: false };
export const UIReducers = createReducer(
  initialUIState,
  on(setLoading, (state, { loading }) => (state = { loading: loading }))
);
