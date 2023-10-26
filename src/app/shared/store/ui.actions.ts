import { createAction, props } from "@ngrx/store";
export const setLoading = createAction(
  "[UI Loading]",
  props<{ loading: boolean }>()
);
