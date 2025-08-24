import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  authenticate(@Body() userCredentials: { login: string; password: string }) {
    return this.authService.authenticate(userCredentials);
  }

  @Post('register')
  create(@Body() userCredentials: { name: string; login: string; password: string; token: string }) {
    return this.authService.create(userCredentials);
  }


  @Post('checktoken')
  checkToken(@Body() userToken: { id: number; token: string }) {
    // return true
    return this.authService.checkToken(userToken);
  }
}
