import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, tap } from "rxjs";

@Injectable()
export class CheckinGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.getSessionStatus().subscribe((c) => {
      if (c) this.router.navigate(["/"]);
    });
  }
}
