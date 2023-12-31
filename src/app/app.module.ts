import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { environment } from "../environments/environment";
// Modulos
import { AppRoutingModule } from "./app-routing.module";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AuthService } from "./services/auth.service";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { AppComponent } from "./app.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/ingreso-egreso.component";
import { EstadisticaComponent } from "./ingreso-egreso/estadistica/estadistica.component";
import { DetalleComponent } from "./ingreso-egreso/detalle/detalle.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthGuard } from "./services/auth.guard";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "./state";
import { StoreDevtools, StoreDevtoolsModule } from "@ngrx/store-devtools";
import { CheckinGuard } from "./services/checkin.guard";
import { IncomeOutcomeService } from "./services/income-outcome.service";
import { IncomeOutcomePipe } from "./services/income-outcome.pipe";
import { NgChartsModule, NgChartsConfiguration } from "ng2-charts";
import { AuthModule } from "./auth/auth.module";
import { IngresoEgresoModule } from "./ingreso-egreso/ingreso-egreso.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    IngresoEgresoModule,
    SharedModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    AuthService,

    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
