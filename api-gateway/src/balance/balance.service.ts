import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class BalanceService {
  constructor(private httpService: HttpService) {}

  getBalance(userId: string, token: string) {
    return this.httpService
      .get(`http://localhost:3000/client/${userId}/balance/${token}`)
      .pipe(
        map(response => response.status)
      );
  }
}