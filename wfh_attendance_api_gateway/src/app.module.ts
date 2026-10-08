import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AttendancesModule } from './attendance/attendance.module';

@Module({
  imports: [
    UsersModule,
    AttendancesModule,
  ],
})
export class AppModule {}
