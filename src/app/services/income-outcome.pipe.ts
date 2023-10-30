import { Pipe, PipeTransform } from "@angular/core";
import { IncomeOutcome } from "../models/income-outcome.model";

@Pipe({
  name: "incomeOutcomePipe",
})
export class IncomeOutcomePipe implements PipeTransform {
  transform(incomeOutcome: IncomeOutcome[]): IncomeOutcome[] {
    return incomeOutcome.sort((a, b) => {
      if (a.income) return -1;
      else return 1;
    });
  }
}
