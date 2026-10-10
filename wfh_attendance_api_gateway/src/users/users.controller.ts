import {Body, Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCredDto } from './dto/user-cred.dto.js';
import { UserForgetPassDto } from './dto/user-forget-pass.dto.js';
import { UserPassReqDto } from './dto/user-pass-req.dto.js';
import { UserResetPassDto } from './dto/user-reset-pass.dto.js';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
  ) {}

  @Post('create-user')
  createUser(@Body() dto: UserCredDto) {
    return this.userService.send(
      { cmd: 'create_user' },
      dto,
    );
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.send(
      { cmd: 'get_user' },
      userId,
    );
  }

  @Post('forgot-password')
  forgetPassword(@Body() dto: UserForgetPassDto) {
    return this.userService.send(
      { cmd: 'forget_pass' },
      dto,
    );
  }

  @Post('reset-flag')
  updateResetPassFlg(@Body() dto: UserPassReqDto) {
    return this.userService.send(
      { cmd: 'update_reset_flg' },
      dto,
    );
  }

  @Post('reset-password')
  resetPassword(@Body() dto: UserResetPassDto) {
    return this.userService.send(
      { cmd: 'reset_pass' },
      dto,
    );
  }

  @Post('login')
  login(@Body() dto: UserCredDto) {
    return this.userService.send(
      { cmd: 'login' },
      dto,
    );
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.send(
      { cmd: 'delete_user' },
      userId,
    );
  }

  @Get()
  getUserList() {
    return this.userService.send(
      { cmd: 'get_user_list' },
      {},
    );
  }
}
