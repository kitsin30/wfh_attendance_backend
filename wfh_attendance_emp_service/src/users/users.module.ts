import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity.js';
import { UsersService } from './users.service.js';
import { PasswordService } from './password.service.js';
import { UsersController } from './users.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],

  controllers: [
    UsersController,
  ],

  providers: [
    UsersService,
    PasswordService
  ],
})
export class UsersModule {}