import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/auth.guard";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { CheckinGuard } from "./services/checkin.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [CheckinGuard] },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [CheckinGuard],
  },

  {
    path: "",
    canLoad: [AuthGuard],
    loadChildren: () =>
      import("./ingreso-egreso/ingreso-egreso.module").then(
        (m) => m.IngresoEgresoModule
      ),
  },

  // {
  //   path: "",
  //   component: DashboardComponent,
  //   children: dashboardRoutes,
  //   canActivate: [AuthGuard],
  // },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
