import { Component, OnDestroy, OnInit } from "@angular/core";
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
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private UIStoreSubscription: Subscription;
  public isLoading: boolean = false;

  public registerForm: FormGroup = new FormGroup({
    user: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
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
  public registerUser() {
    if (!this.registerForm.valid) return;
    this.store.dispatch(setLoading({ loading: true }));
    this.authService
      .createUser(
        this.registerForm.value.user,
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(() => {
        this.store.dispatch(setLoading({ loading: false }));
        this.router.navigate(["/"]);
      })
      .catch((err: FirebaseError) => {
        if (err) {
          this.store.dispatch(setLoading({ loading: false }));

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
