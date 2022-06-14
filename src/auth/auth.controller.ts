import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

import { LocalAuthGuard } from './local/local-auth.guard';
import { Public } from './decorator/public.decorator';
import { User } from '@prisma/client';

@Controller('/api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Public()
  async login(@Body() body: AuthLoginDto, @Request() req: { user: User }) {
    return this.authService.signJWT({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    });
  }
}
