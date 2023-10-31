import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IncomeOutcomeService } from "../services/income-outcome.service";
import { CheckinGuard } from "../services/checkin.guard";
import { IncomeOutcomePipe } from "../services/income-outcome.pipe";
import { NgChartsConfiguration, NgChartsModule } from "ng2-charts";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "../dashboard/dashboard.routing.module";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "../state";
import { IncomeOutcomesReducers } from "./store/income-outcome.reducers";

@NgModule({
  declarations: [
    IngresoEgresoComponent,
    DetalleComponent,
    DashboardComponent,
    EstadisticaComponent,
    IncomeOutcomePipe,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    StoreModule.forFeature("IncomeOutcomeState", IncomeOutcomesReducers),
  ],
  exports: [],
  providers: [
    IncomeOutcomeService,
    CheckinGuard,
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
  ],
})
export class IngresoEgresoModule {}
