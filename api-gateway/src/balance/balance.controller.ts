import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':userId/:token')
  getBalance(@Param('userId' ) userId: string, @Param('token') token: string) {
    return this.balanceService.getBalance(userId, token);
  }
}