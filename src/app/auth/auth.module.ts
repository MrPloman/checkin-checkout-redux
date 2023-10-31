import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "../state";
import { AuthService } from "../services/auth.service";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { CheckinGuard } from "../services/checkin.guard";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [AuthService, AuthGuard, CheckinGuard],
})
export class AuthModule {}
