import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state";
import { selectUILoading } from "../shared/store/ui.selector";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IncomeOutcome } from "../models/income-outcome.model";
import { newIncomeOutcomeAction } from "./store/income-outcome.actions";
import { IncomeOutcomeService } from "../services/income-outcome.service";
@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  private UIStoreSubscription: Subscription;
  public isLoading: boolean = false;
  public income: boolean = true;
  public incomeOutcomeForm: FormGroup<{
    description: FormControl<string>;
    amount: FormControl<number | null>;
    income: FormControl<boolean>;
  }> = new FormGroup({
    description: new FormControl("", Validators.required),
    amount: new FormControl(null, Validators.required),
    income: new FormControl(true, Validators.required),
  });

  constructor(
    private incomeOutcomeService: IncomeOutcomeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.UIStoreSubscription = this.store
      .select(selectUILoading)
      .subscribe((state) => {
        this.isLoading = state;
        this.income = true;
      });
  }

  ngOnDestroy(): void {
    this.UIStoreSubscription.unsubscribe();
  }

  public resetForm() {
    this.income = true;
    return new FormGroup({
      description: new FormControl("", Validators.required),
      amount: new FormControl(null, Validators.required),
      income: new FormControl(true, Validators.required),
    });
  }
  public setIncomeOrOutcome() {
    this.incomeOutcomeForm.value.income = !this.incomeOutcomeForm.value.income;
    this.income = !this.income;
  }
  public createIncomeOutcome() {
    if (!this.incomeOutcomeForm.valid) return;
    const incomeOutcome = new IncomeOutcome(
      this.incomeOutcomeForm.value.description,
      this.incomeOutcomeForm.value.amount,
      this.incomeOutcomeForm.value.income,
      new Date().getTime()
    );
    this.incomeOutcomeService.createNewIncomeOutcome(incomeOutcome).then(() => {
      this.incomeOutcomeForm = this.resetForm();
    });
  }
}
