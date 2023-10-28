import { createReducer, on } from "@ngrx/store";
import {
  deleteAllIncomeOutcomeAction,
  deleteIncomeOutcomeAction,
  getIncomesOutcomesFromDB,
  modifyIncomeOutcomeAction,
  newIncomeOutcomeAction,
} from "./income-outcome.actions";
import { IncomeOutcome } from "../../models/income-outcome.model";
export const initialIncomeOutcomesState: IncomeOutcome[] = [];
export const IncomeOutcomesReducers = createReducer(
  initialIncomeOutcomesState,
  on(newIncomeOutcomeAction, (state, { incomeOutcome }) => [
    ...state,
    incomeOutcome,
  ]),
  on(
    modifyIncomeOutcomeAction,
    (state, { description, amount, income, uid }) => {
      return state.map((incomeOutcome: IncomeOutcome) => {
        if (incomeOutcome.uid === uid) {
          const incomeOutcomeModified = new IncomeOutcome(
            description,
            amount,
            income,
            uid
          );
          return incomeOutcomeModified;
        } else {
          return incomeOutcome;
        }
      });
    }
  ),
  on(
    getIncomesOutcomesFromDB,
    (state, { incomesOutcomes }) => (state = incomesOutcomes)
  ),
  on(deleteAllIncomeOutcomeAction, (state) => (state = [])),
  on(deleteIncomeOutcomeAction, (state, { uid }) =>
    state.filter((incomeOutcome: IncomeOutcome) => incomeOutcome.uid !== uid)
  )
);
