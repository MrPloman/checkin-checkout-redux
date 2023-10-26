import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { AppState } from "./state";
import { Store } from "@ngrx/store";
import { setLoading } from "./shared/store/ui.actions";
import { selectUILoading } from "./shared/store/ui.selector";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  constructor(
    private authService: AuthService,
    private router: Router,
    private state: Store<AppState>
  ) {}
  ngOnInit(): void {}
}
