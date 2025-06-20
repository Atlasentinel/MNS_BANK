import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  authenticate(userCredentials: { login: string; password: string }) {
    return this.httpService.post('http://ms-login:3001/api/auth/login', userCredentials).pipe(map(response => response.data));
  }

  checkToken(token: { token: string }) {
    return this.httpService.post('http://ms-login:3001/api/auth/checktoken', token).pipe(map(response => response.data));
  }
}
