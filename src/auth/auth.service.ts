import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass && user.isActive) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credentials incorrect');
  }
}