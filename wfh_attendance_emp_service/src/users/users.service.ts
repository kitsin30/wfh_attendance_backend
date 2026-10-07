import { Entity } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/users/entity/user.entity';
import { UserCredDto } from 'src/users/dto/user-cred.dto';
import { UserResetPassReqDto } from 'src/users/dto/user-reset-pass-req.dto';
import { UserResetPassDto } from 'src/users/dto/user-reset-pass.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: UserCredDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      userId: dto.userId,
      password: hashedPassword,
      updUid: dto.updUid
    });

    return this.userRepository.save(user);
  }
}