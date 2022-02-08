import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(dto: AuthDto): Promise<any> {
     // console.log(dto.userName);
    const user = await this.usersService.findOne(dto.userName);
    if (user && user.password === dto.password && user.isActive) {
      const { password, firstName, lastName, isActive, ...result } = user;
      return this.signUser(result.userId, result.userName);
    }
    throw new UnauthorizedException("Bad Credentials");
  }

  async signUser(userid: number, username: string) {
    const payload = { username: username, sub: userid };
    return this.jwtService.sign(payload);
  }

}