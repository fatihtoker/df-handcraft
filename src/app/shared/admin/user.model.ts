export class UserModel {
  username: string;
  password: string;

  constructor(credentials: any = null) {
    if (credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
    }
  }
}
