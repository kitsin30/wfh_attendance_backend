import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service.js';
import { UserCredDto } from './dto/user-cred.dto.js';
import { UserForgetPassDto } from './dto/user-forget-pass.dto.js';
import { UserPassReqDto } from './dto/user-pass-req.dto.js';
import { UserResetPassDto } from './dto/user-reset-pass.dto.js';

@Controller()
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'create_user' })
  async create(@Payload() dto: UserCredDto) {
    return this.usersService.createUser(dto);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(@Payload() userId: string) {
    return this.usersService.getUser(userId);
  }

  @MessagePattern({ cmd: 'forget_pass' })
  forgetPass(@Payload() dto: UserForgetPassDto) {
    return this.usersService.forgetPassword(dto);
  }

  @MessagePattern({ cmd: 'update_reset_flg' })
  updateResetPassFlg(@Payload() dto: UserPassReqDto) {
    return this.usersService.updateResetPassFlg(dto);
  }

  @MessagePattern({ cmd: 'reset_pass' })
  resetPassword(@Payload() dto: UserResetPassDto) {
    return this.usersService.resetPassword(dto);
  }

  @MessagePattern({ cmd: 'login' })
  login(@Payload() dto: UserCredDto) {
    return this.usersService.login(dto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(@Payload() userId: string,) {
    return this.usersService.deleteUser(userId);
  }

  @MessagePattern({ cmd: 'get_user_list' })
  getUserList() {
    return this.usersService.getUserList();
  }
}