import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './entity/attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

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