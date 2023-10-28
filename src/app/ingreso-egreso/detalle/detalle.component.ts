import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IncomeOutcome } from "src/app/models/income-outcome.model";
import { IncomeOutcomeService } from "src/app/services/income-outcome.service";
import { AppState } from "src/app/state";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: [],
})
export class DetalleComponent implements OnInit {
  public incomesOutcomesSubscription: Subscription;
  public incomesOutcomes: IncomeOutcome[] = [];

  constructor(
    private incomeOutcomeService: IncomeOutcomeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select("IncomeOutcomeState").subscribe((incomes) => {
      this.incomesOutcomes = incomes;
    });
  }
  public changeIncomeOutcomeStatus(incomeOutcome: IncomeOutcome) {
    incomeOutcome.income = !incomeOutcome.income;
    this.incomeOutcomeService.changeIncomeOutcomeStatus(incomeOutcome);
  }
  public removeIncomeOutcome(incomeOutcome: IncomeOutcome) {
    this.incomeOutcomeService.deleteIncomeOutcome(incomeOutcome);
  }
}
