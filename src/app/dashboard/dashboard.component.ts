import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { setLoading } from "../shared/store/ui.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private state: Store) {}

  ngOnInit() {}
}
