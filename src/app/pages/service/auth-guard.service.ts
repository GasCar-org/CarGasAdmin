import { UserService } from './../../@core/data/users.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userServices: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('auth_user') != null) {
      let roles = next.data['roles'] as Array<String>
      if (roles) {
        var match = this.userServices.roleMatch(roles);
        if (match) return true
        else {
          this.router.navigate(['/pages/404'])
          return false
        }
      } else
        return true

    }
    this.router.navigate(['/SignIn'])
    return false;
  }
}
