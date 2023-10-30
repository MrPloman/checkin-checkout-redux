import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { setLoading } from "../shared/store/ui.actions";
import { AuthService } from "../services/auth.service";
import { AppState } from "../state";
import { Observable, Subscription, filter } from "rxjs";
import { IncomeOutcomeService } from "../services/income-outcome.service";
import { User } from "../models/user.model";
import { IncomeOutcome } from "../models/income-outcome.model";
import { getIncomesOutcomesFromDB } from "../ingreso-egreso/store/income-outcome.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public authSubscription: Subscription;
  public incomeOutcomeSubscription: Subscription;
  public incomesOutcomes: IncomeOutcome[];
  constructor(
    private incomeOutcomeService: IncomeOutcomeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(setLoading({ loading: true }));
    this.authSubscription = this.store
      .select("AuthState")
      .pipe(filter((data) => data.user !== undefined || !!data?.user?.uid))
      .subscribe(({ user }) => {
        this.incomeOutcomeSubscription = this.incomeOutcomeService
          .initiIncomeOutcomeListener(user.uid)
          .subscribe((listPar) => {
            this.authSubscription.unsubscribe();
            if (listPar) {
              this.store.dispatch(
                getIncomesOutcomesFromDB({ incomesOutcomes: listPar })
              );
              this.store.dispatch(setLoading({ loading: false }));
              this.incomeOutcomeSubscription.unsubscribe();
            }
          });
      });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.incomeOutcomeSubscription.unsubscribe();
    this.incomeOutcomeService.deleteAllIncomeOutcome();
  }
}
