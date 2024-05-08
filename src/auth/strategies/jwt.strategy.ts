import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly configService: ConfigService
  ) {
    const SECRET_KEY = configService.get<string>('jwt.secret', '')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY
    })
  }

  async validate (payload: any): Promise<Record<string, unknown>> {
    return {
      id: payload.sub
    }
  }
}
