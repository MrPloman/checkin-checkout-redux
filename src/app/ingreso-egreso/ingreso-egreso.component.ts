import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state";
import { selectUILoading } from "../shared/store/ui.selector";
import { Subscription } from "rxjs";
@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  private UIStoreSubscription: Subscription;
  public isLoading: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.UIStoreSubscription = this.store
      .select(selectUILoading)
      .subscribe((state) => {
        this.isLoading = state;
      });
  }

  ngOnDestroy(): void {
    this.UIStoreSubscription.unsubscribe();
  }
}
