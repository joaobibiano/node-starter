import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.authenticate({
      email,
      password,
    });
  }

  async signJWT(user: { id: string; email: string; role: string }) {
    return {
      access_token: this.jwtService.sign(user),
      refresh_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }
}
