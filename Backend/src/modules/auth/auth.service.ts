import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  validate(user: string, pass: string): string | null {
    const adminUser = this.config.get('ADMIN_USER') || 'admin';
    const adminPass = this.config.get('ADMIN_PASS') || 'admin123';
    if (user === adminUser && pass === adminPass) {
      return this.jwt.sign({ sub: 'admin', role: 'admin' });
    }
    return null;
  }
}