import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
    constructor(private auth: AuthService,
                private router: Router
    ) {
    };

    public canActivate() {
        if (this.auth.isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/']).then();
            return false;
        }
    }
}
