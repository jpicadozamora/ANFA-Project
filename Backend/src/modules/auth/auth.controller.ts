import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() body: { user: string; pass: string }) {
    const token = this.service.validate(body.user, body.pass);
    if (!token) throw new UnauthorizedException('Credenciales incorrectas');
    return { token };
  }
}