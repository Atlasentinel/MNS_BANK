import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  authenticate(userCredentials: { login: string; password: string }) {
    return this.httpService.post('http://ms-login:3001/auth/login', userCredentials).pipe(map(response => response.data));
  }

  checkToken(userToken: { id: number;token: string }) {
    return this.httpService.post('http://ms-login:3001/check/token', userToken).pipe(map(response => response.data));
  }

  create(userCredentials: { name: string; login: string; password: string; token: string }) {
    return this.httpService.post('http://ms-login:3001/auth/register', userCredentials).pipe(map(response => response.data));
  }
}
