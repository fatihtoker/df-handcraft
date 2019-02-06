import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../admin/auth-service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  credentials = {
    'username': '',
    'password': ''
  };
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.credentials);
    this.authService.authenticate(this.credentials);
  }

}
