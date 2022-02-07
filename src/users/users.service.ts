import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ isActive: true });
  }

  findOne(userName: string): Promise<User> {
    return this.userRepository.findOne({ userName });
  }

  async update(userName: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ userName }, updateUserDto);
    return this.userRepository.findOne({ userName });
  }

  async remove(userName: string): Promise<User> {
    await this.userRepository.update({ userName }, { isActive: false });
    // return this.userRepository.delete(id);
    return this.userRepository.findOne({ userName });
  }

}
