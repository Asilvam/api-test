import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { JwtPayloadInterface } from "./jwt-payload.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(dto: AuthDto): Promise<any> {
    const user = await this.usersService.findOne(dto.userName);

    if (!user) {
      throw new BadRequestException("invalid credentials");
    }
    if (!await bcrypt.compare(dto.password, user.password)) {
      throw new BadRequestException("invalid credentials");
    }
    if (!user.isActive) {
      throw new BadRequestException("invalid credentials");
    }

    const { password, ...result } = user;
    return await this.signUser(result);
  }

  async signUser(payload: JwtPayloadInterface) {
    return this.jwtService.sign(payload);
  }

}