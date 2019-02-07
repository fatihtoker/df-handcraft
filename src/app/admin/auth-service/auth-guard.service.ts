import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }
  canActivate() {
    console.log(this.auth.isAuthenticated());
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['admin-panel/giris']);
      // window.location.href = 'admin-panel/giris';
      return false;
    }
    return true;
  }
}
