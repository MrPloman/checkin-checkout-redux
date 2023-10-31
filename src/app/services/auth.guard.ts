import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, tap, take } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getSessionStatus().pipe(
      tap((state) => {
        if (!state) this.router.navigate(["/login"]);
      })
    );
  }
  canLoad(): Observable<boolean> {
    return this.authService.getSessionStatus().pipe(
      tap((state) => {
        if (!state) this.router.navigate(["/login"]);
      }, take(1))
    );
  }
}
