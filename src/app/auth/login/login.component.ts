import { Component, OnInit } from "@angular/core";
import { FirebaseError } from "@angular/fire/app";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { setLoading } from "src/app/shared/store/ui.actions";
import { selectUILoading } from "src/app/shared/store/ui.selector";
import { AppState } from "src/app/state";
import Swal from "sweetalert2";
import { setUser } from "../store/auth.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  private UIStoreSubscription: Subscription;
  public isLoading: boolean = false;
  public loginForm: FormGroup<{ email: FormControl; password: FormControl }> =
    new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

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

  public login() {
    if (!this.loginForm.valid) return;
    this.store.dispatch(setLoading({ loading: true }));
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((credentials) => {
        this.store.dispatch(setLoading({ loading: false }));
        if (credentials && credentials.user && credentials.user.uid) {
          this.store.dispatch(
            setUser({
              email: credentials.user.email,
              name: credentials.user.displayName,
              uid: credentials.user.uid,
            })
          );
          this.router.navigate(["/"]);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      })
      .catch((err: FirebaseError) => {
        this.store.dispatch(setLoading({ loading: false }));
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      });
  }
}
