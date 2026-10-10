import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './entity/attendance.entity.js';
import { AttendanceService } from './attendance.service.js';
import { AttendanceController } from './attendance.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendanceEntity]),
  ],

  controllers: [
    AttendanceController,
  ],

  providers: [
    AttendanceService
  ],
})
export class AttendanceModule {}