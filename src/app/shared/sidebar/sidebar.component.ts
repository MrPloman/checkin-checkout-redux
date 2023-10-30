import { Component, OnInit } from "@angular/core";
import { deleteUser } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { removeUser, setUser } from "src/app/auth/store/auth.actions";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/state";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit {
  private authSubscription: Subscription;
  public user: User;
  constructor(
    private authService: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authSubscription = this.store
      .select("AuthState")
      .subscribe(({ user }) => {
        if (user) {
          this.user = user;
          this.authSubscription.unsubscribe();
        }
      });
  }
  public signOut() {
    this.authService
      .signOutSession()
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.store.dispatch(removeUser());

        this.router.navigate(["/login"]);
      });
  }
}
