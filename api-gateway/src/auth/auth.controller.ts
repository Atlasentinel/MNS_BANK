import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  authenticate(@Body() userCredentials: { login: string; password: string }) {
    return this.authService.authenticate(userCredentials);
  }

  @Post('checktoken')
  checkToken(@Body() token: { token: string }) {
    return true
    return this.authService.checkToken(token);
  }
}
