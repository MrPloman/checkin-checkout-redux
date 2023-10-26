import { Component, OnInit } from "@angular/core";
import { deleteUser } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { removeUser, setUser } from "src/app/auth/store/auth.actions";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/state";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}
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
