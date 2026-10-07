import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class AttendanceSpecificUser {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  attendanceDate: Date;
}