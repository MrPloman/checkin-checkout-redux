import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IncomeOutcome } from "src/app/models/income-outcome.model";
import { IncomeOutcomeService } from "src/app/services/income-outcome.service";
import { AppState } from "src/app/state";
import { ChartData, ChartEvent, ChartType } from "chart.js";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  public incomesOutcomesSubscription: Subscription;
  public totalIncomesAmount: number = 0;
  public totalOutcomesAmount: number = 0;
  public percentageTotalIncomes: number = 0;
  public percentageTotalOutcomes: number = 0;
  public itemsnumberIncomes: number = 0;
  public itemsnumberOutcomes: number = 0;

  constructor(
    private incomeOutcomeServices: IncomeOutcomeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.incomesOutcomesSubscription = this.store
      .select("IncomeOutcomeState")
      .subscribe((incomesOutcomes: IncomeOutcome[]) => {
        if (incomesOutcomes && incomesOutcomes.length > 0) {
          this.incomeOutcomeServices
            .getIncomesOutcomesAmounts(incomesOutcomes)
            .then(({ amounts, percentages, totalItems }) => {
              this.totalIncomesAmount = amounts.incomes;
              this.totalOutcomesAmount = amounts.outcomes;
              this.percentageTotalIncomes = percentages.incomes;
              this.percentageTotalOutcomes = percentages.outcomes;
              this.itemsnumberIncomes = totalItems.incomes;
              this.itemsnumberOutcomes = totalItems.outcomes;
              this.doughnutChartData = {
                labels: this.doughnutChartLabels,
                datasets: [
                  { data: [this.totalIncomesAmount, this.totalOutcomesAmount] },
                ],
              };
              this.incomesOutcomesSubscription.unsubscribe();
            });
        }
      });
  }
  ngOnDestroy(): void {
    this.incomesOutcomesSubscription.unsubscribe();
  }
  public doughnutChartLabels: string[] = ["Incomes", "Outcomes"];
  public doughnutChartData: ChartData<"doughnut"> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [this.totalIncomesAmount, this.totalOutcomesAmount] }],
  };
  public doughnutChartType: ChartType = "doughnut";

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
