import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  userModel: UserModel;
  showSpinner = false;
  showError = false;
  errorMessage: string;
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.userModel = new UserModel();
  }

  handleError(error: any) {
    this.errorMessage = '';
    this.showError = true;
    const statusCode = error.status;

    switch (statusCode) {
      case 400:
        this.errorMessage = 'Bir hata oluştu, lütfen değerleri kontrol edip tekrar deneyiniz.';
        break;
      case 500:
        this.errorMessage = 'Sunucu ile ilgili bir hata oluştu. Lütfen sistem yöneticinizle iletişime geçin.';
        break;
      case 401:
        this.errorMessage = 'Kullanıcı adı veya şifre yanlış';
        break;
      default:
        this.errorMessage = 'Bir hata meydana geldi.';
    }
  }
  ngOnInit() {
  }
  onSubmit() {
    this.showSpinner = true;
    this.showError = false;
    this.authService.authenticate(this.userModel).subscribe(response => {
      const token = response['token'];
      this.showSpinner = false;
      localStorage.setItem('token', token);
      this.router.navigate(['admin-panel']);
    }, error => {
      this.handleError(error);
      this.showSpinner = false;
      this.snackBar.open(this.errorMessage, undefined, {
        duration: 4000
      });
    });
  }
}
