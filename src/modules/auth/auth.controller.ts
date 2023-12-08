import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() data: AuthLoginDto, @Res() response: Response) {
    const access_token = await this.authService.signIn(data);

    response.cookie('hubble_access_token', access_token, {
      httpOnly: true,
      maxAge: 60 * 72,
      sameSite: 'none',
      secure: true,
    });

    response.json({ message: 'Logged in successfully' });
  }
}
