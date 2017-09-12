import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router
  ) {};

  canActivate() {
    if (this.auth.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/']).then();
      return false;
    }
  }
}

@Injectable()
export class OnlyEntrepreneurGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router
  ) {};

  canActivate() {
    if (this.auth.isAccTypeEntrepreneur) {
      return true;
    } else {
      this.router.navigate(['/']).then();
      return false;
    }
  }
}
