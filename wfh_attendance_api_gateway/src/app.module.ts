import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AttendancesModule } from './attendance/attendance.module.js';

@Module({
  imports: [
    UsersModule,
    AttendancesModule,
  ],
})
export class AppModule {}
