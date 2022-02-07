import { Controller, Post, Request } from "@nestjs/common";
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() request) {
    const {userName, password}=request.body;
    return await this.authService.validateUser(userName, password);
  }
}