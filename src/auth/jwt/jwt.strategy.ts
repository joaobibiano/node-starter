import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
  id: number;
  email: string;
  iat: number;
  exp: number;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * After token is decoded, validate is called
   * this methods return is attached to req.user
   */
  async validate(payload: JwtPayload) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
