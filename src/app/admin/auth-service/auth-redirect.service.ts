import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthRedirectService {
  constructor(public auth: AuthService, public router: Router) {
  }
  async canActivate() {
    const status = await this.auth.isAuthenticated();
    if (status && status['code'] === 200) {
        window.location.href = 'admin-panel/';
        return true;
    }
    return true;
  }
}