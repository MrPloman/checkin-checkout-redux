import { createAction, props } from "@ngrx/store";
import { IncomeOutcome } from "../../models/income-outcome.model";
export const newIncomeOutcomeAction = createAction(
  "[Create IncomeOutcome]",
  props<{ incomeOutcome: IncomeOutcome }>()
);
export const modifyIncomeOutcomeAction = createAction(
  "[Modify IncomeOutcome]",
  props<{ description: string; amount: number; income: boolean; uid: number }>()
);
export const getIncomesOutcomesFromDB = createAction(
  "[Get All Incomes Outcomes]",
  props<{ incomesOutcomes: IncomeOutcome[] }>()
);
export const deleteIncomeOutcomeAction = createAction(
  "[Delete IncomeOutcome]",
  props<{ uid: number }>()
);
export const deleteAllIncomeOutcomeAction = createAction(
  "[Delete All IncomeOutcome]"
);
