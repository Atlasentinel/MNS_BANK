import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  authenticate(userCredentials: { username: string; password: string }) {
    return this.httpService.post('http://localhost:3001/auth', userCredentials).pipe(map(response => response.data));
  }
}
