import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, BadRequestException
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.userName);
    if (user) {
      throw new BadRequestException("Username already exist!");
    }
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":userName")
  findOne(@Param("userName") userName: string) {
    return this.usersService.findOne(userName);
  }

  @Patch(":userName")
  update(@Param("userName") userName: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userName, updateUserDto);
  }

  @Delete(":userName")
  remove(@Param("userName") userName: string) {
    return this.usersService.remove(userName);
  }

}
