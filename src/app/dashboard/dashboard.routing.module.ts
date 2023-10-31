import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { dashboardRoutes } from "./dashboard.routes";
import { AuthGuard } from "../services/auth.guard";

const childRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuard],
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
