import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signInDTO';
import { AuthGuard } from './auth.guard';
import { RegisterDTO } from './dto/registerDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto.username, registerDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profiles')
  getProfile(@Request() req) {
    return req.user;
  }
}
