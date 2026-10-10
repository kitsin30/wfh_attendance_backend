import { Entity, FindOptionsWhere } from 'typeorm';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from './entity/user.entity.js';
import { UserCredDto } from './dto/user-cred.dto.js';
import { UserPassReqDto } from './dto/user-pass-req.dto.js';
import { UserForgetPassDto } from './dto/user-forget-pass.dto.js';
import { PasswordService } from './password.service.js';
import { UserResetPassDto } from './dto/user-reset-pass.dto.js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService
  ) {}

  async createUser(dto: UserCredDto) {
    try {
      const hashedPassword = await this.passwordService.hashingPass(dto.password);

      const user = this.userRepository.create({
        userId: dto.userId,
        password: hashedPassword,
        updUid: dto.updUid,
        userLevel: dto.userLevel
      });

      await this.userRepository.insert(user);
      return {
        success: true,
        message: 'User Successfully created'
      };
    } catch(error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new RpcException({
          statusCode: 409,
          message: 'User already exists',
        });
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Failed to save user',
      });
    }
  }

  async updateUser(condUserEntity: FindOptionsWhere<UserEntity>
    , currUserEntity: Partial<UserEntity>, currUserId: string) {
    const result = await this.userRepository.update(condUserEntity, currUserEntity);

    if (result.affected === 0) {
      throw new RpcException({
        statusCode: 404,
        message: `user id ${currUserId} not found`,
      });
    }

    return {
      success: true,
      message: 'User Successfully updated'
    };
  }

  async forgetPassword(dto: UserForgetPassDto) {
    const hashedPassword = await this.passwordService.hashingPass(dto.newPassword);
    const result = await this.updateUser(
      { userId: dto.userId},
      { password: hashedPassword, updUid: dto.userId},
      dto.userId
    );

    return result;
  }

  async updateResetPassFlg(dto: UserPassReqDto) {
    const result = await this.updateUser(
      {userId: dto.userId},
      {resetPassFlg: 'Y', updUid: dto.updUid},
      dto.userId
    );

    return result;
  }

  async resetPassword(dto: UserResetPassDto) {
    const user = await this.getUser(dto.userId);

    const isPassCorrect = await this.passwordService.comparePass(dto.password, user.password);
    if (!isPassCorrect) {
      throw new RpcException({
        statusCode: 401,
        message: `wrong old password for user id ${dto.userId}`,
      });
    }

    const hashedPassword = await this.passwordService.hashingPass(dto.newPassword)

    const result = await this.updateUser(
      { userId: dto.userId, resetPassFlg: 'Y'},
      { password: hashedPassword, updUid: dto.userId, resetPassFlg: 'N'},
      dto.userId
    );

    return result;
  }

  async getUser(currUserId: string) {
    const user = await this.userRepository.findOne({
      where: {
        userId: currUserId
      }
    });
    if (user === null) {
      throw new RpcException({
        statusCode: 404,
        message: `user id ${currUserId} not found`,
      });
    }
    
    return user
  }

  async login(dto: UserCredDto) {
    const user = await this.getUser(dto.userId);
    
    const isPassCorrect = await this.passwordService.comparePass(dto.password, user.password);
    if (!isPassCorrect) {
      throw new RpcException({
        statusCode: 401,
        message: `wrong password for user id ${dto.userId}`,
      });
    }

    if (user.resetPassFlg === 'Y') {
      return {
        success: true,
        status: 'RESET_PASSWORD_REQUIRED',
        message: 'Password reset required',
        userEntity: user,
      };
    }

    return {
      success: true,
      status: 'LOGIN_SUCCESS',
      message: 'Login successfully',
      userEntity: user,
    };
  }

  async deleteUser(currUserId: string) {
    const result = await this.userRepository.delete({
      userId: currUserId
    });

    if (result.affected === 0) {
      throw new RpcException({
        statusCode: 404,
        message: `failed to delete, user id ${currUserId} not found`,
      });
    }

    return {
      success: true,
      message: 'User Successfully deleted'
    };
  }

  async getUserList() {
    const result = await this.userRepository.find();

    if (result === null) {
      throw new RpcException({
        statusCode: 404,
        message: `All User not found`,
      });
    }

    return result;
  }
}